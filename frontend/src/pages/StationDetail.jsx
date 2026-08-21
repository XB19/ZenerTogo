import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { stations } from '../data/stations.js';
import { pickLang } from '../utils/i18nData.js';
import './StationDetail.css';

function StationDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const station = stations.find((s) => String(s.id) === id);

  if (!station) {
    return (
      <div className="page-stationdetail station-container">
        <h1>{t('stations.detail.notFoundTitle')}</h1>
        <p>
          <Link to="/stations">{t('stations.detail.backToStations')}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page-stationdetail">
      <div className="station-hero">
        <img src={station.image} alt={station.name} />
        <div className="station-hero-overlay"></div>

        <div className="station-hero-text">
          <span className="station-hero-city">{station.city}</span>
          <h1>{station.name}</h1>
        </div>
      </div>

      <div className="container station-body">
        <p className="station-description">{pickLang(station.description, lang)}</p>

        {(station.address || station.phone) && (
          <div className="station-contact">
            {station.address && (
              <p className="station-contact-item">
                <i className="fa-solid fa-location-dot"></i>
                {station.address}
              </p>
            )}
            {station.phone && (
              <a className="station-contact-item" href={`tel:${station.phone.replace(/\s+/g, '')}`}>
                <i className="fa-solid fa-phone"></i>
                {station.phone}
              </a>
            )}
          </div>
        )}

        <div className="station-services">
          <h2>{t('stations.detail.servicesTitle')}</h2>
          <p>{pickLang(station.services, lang)}</p>
        </div>

        <div className="station-actions">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            {t('stations.detail.directionsCta')}
          </a>

          <Link to="/stations" className="back-link">
            ← {t('stations.detail.backToStations')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StationDetail;
