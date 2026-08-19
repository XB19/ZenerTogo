import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { stations } from '../data/mockData.js';
import './Stations.css';

function goToStation(lat, lng) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      window.open(
        `https://www.google.com/maps/dir/${userLat},${userLng}/${lat},${lng}`,
        '_blank'
      );
    });
  }
}

function Stations() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    window.goToStation = goToStation;

    if (!window.L || !mapRef.current || mapInstance.current) return undefined;

    const map = window.L.map(mapRef.current).setView([8.6195, 0.8248], 7);
    mapInstance.current = map;

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    stations.forEach((station) => {
      const marker = window.L.marker([station.lat, station.lng]).addTo(map);

      marker.bindPopup(`
        <div class="station-popup">
          <h3>${station.name}</h3>
          <p>📍 ${station.city}</p>
          <p>${station.services}</p>
          <button class="popup-btn" onclick="goToStation(${station.lat},${station.lng})">
            Voir mon itinéraire
          </button>
        </div>
      `);
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="page-stations">
      {/* HERO */}
      <section className="stations-hero">
        <div className="stations-overlay"></div>

        <div className="container">
          <div className="stations-content">
            <span className="stations-badge">RÉSEAU ZENER</span>
            <h1>Retrouvez nos stations partout au Togo</h1>
            <p>
              Consultez les stations ZENER, trouvez celle la plus proche de vous et
              obtenez votre itinéraire en un clic.
            </p>
          </div>
        </div>
      </section>

      {/* CARTE */}
      <section className="stations-intro">
        <div className="container">
          <div className="section-heading">
            <h2>Carte interactive des stations</h2>
            <p>Cliquez sur une station pour consulter ses informations et obtenir votre itinéraire.</p>
          </div>

          <div className="map-wrapper">
            <div id="map" ref={mapRef}></div>
          </div>
        </div>
      </section>

      {/* STATIONS */}
      <section className="stations-list">
        <div className="container">
          <div className="section-heading">
            <h2>Nos stations principales</h2>
          </div>

          <div className="stations-grid">
            {stations.map((station) => (
              <div className="station-card" key={station.id}>
                <h3>{station.name}</h3>
                <div className="station-city">{station.city}</div>
                <p>{station.services}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="station-cta">
        <div className="container">
          <h2>Toujours une station proche de vous</h2>
          <p>
            ZENER poursuit le développement de son réseau afin de rapprocher ses
            services des particuliers et des entreprises sur toute l'étendue du
            territoire.
          </p>

          <Link to="/contact" className="cta-btn">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Stations;
