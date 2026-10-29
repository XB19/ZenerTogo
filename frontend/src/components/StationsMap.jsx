import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './StationsMap.css';

// Marqueur maison (SVG inline) : évite le bug classique des icônes Leaflet
// cassées une fois passées par un bundler (chemins d'images par défaut non
// résolus par Vite).
const markerIcon = L.divIcon({
  className: 'zener-map-marker',
  html: `
    <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="#1b60ad"/>
      <circle cx="15" cy="15" r="6" fill="#9fc63b"/>
    </svg>
  `,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -36],
});

// Centre par défaut : le Togo (réseau Oasis), avant que fitBounds ne
// recadre sur les marqueurs réels une fois chargés.
const DEFAULT_CENTER = [8.6195, 0.8248];
const DEFAULT_ZOOM = 7;

function openDirections(destLat, destLng, originLat, originLng) {
  const origin = originLat != null ? `${originLat},${originLng}/` : '';
  window.open(`https://www.google.com/maps/dir/${origin}${destLat},${destLng}`, '_blank', 'noopener,noreferrer');
}

function goToStation(lat, lng) {
  if (!navigator.geolocation) {
    openDirections(lat, lng);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => openDirections(lat, lng, position.coords.latitude, position.coords.longitude),
    () => openDirections(lat, lng),
    { timeout: 5000 }
  );
}

function StationsMap({ stations }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Initialisation de la carte une seule fois.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return undefined;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      tap: true,
    }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Le zoom à la molette ne s'active qu'après un clic sur la carte, pour
    // ne pas bloquer le défilement de la page (essentiel sur mobile).
    map.on('click', () => map.scrollWheelZoom.enable());
    containerRef.current.addEventListener('mouseleave', () => map.scrollWheelZoom.disable());

    const invalidate = () => map.invalidateSize();
    const resizeObserver = new ResizeObserver(invalidate);
    resizeObserver.observe(containerRef.current);
    window.addEventListener('orientationchange', invalidate);
    requestAnimationFrame(invalidate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', invalidate);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // (Re)pose des marqueurs quand la liste de stations ou la langue change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return undefined;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = [];

    stations.forEach((station) => {
      if (typeof station.lat !== 'number' || typeof station.lng !== 'number') return;

      const marker = L.marker([station.lat, station.lng], { icon: markerIcon }).addTo(map);

      marker.bindPopup(`
        <div class="station-popup">
          <h3>${station.name}</h3>
          <p>📍 ${station.address || station.city}</p>
          ${station.phone ? `<p>📞 ${station.phone}</p>` : ''}
          <button type="button" class="popup-btn" data-lat="${station.lat}" data-lng="${station.lng}">
            ${t('stations.map.popupCta')}
          </button>
        </div>
      `);

      markersRef.current.push(marker);
      bounds.push([station.lat, station.lng]);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 13 });
    }

    const onPopupOpen = (e) => {
      const btn = e.popup.getElement()?.querySelector('.popup-btn');
      if (!btn) return;
      btn.addEventListener('click', () => goToStation(Number(btn.dataset.lat), Number(btn.dataset.lng)));
    };

    map.on('popupopen', onPopupOpen);
    return () => map.off('popupopen', onPopupOpen);
  }, [stations, t, i18n.language]);

  return (
    <div
      id="map"
      className="zener-map"
      ref={containerRef}
      role="application"
      aria-label={t('stations.map.ariaLabel')}
    ></div>
  );
}

export default StationsMap;
