import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StationCard from '../components/StationCard.jsx';
import TogoStationsMap from '../components/TogoStationsMap.jsx';
import { stations } from '../data/stations.js';
import './Stations.css';

function Stations() {
  const { t } = useTranslation();

  return (
    <div className="page-stations">
      {/* HERO */}
      <section className="stations-hero">
        <div className="stations-overlay"></div>

        <div className="container">
          <div className="stations-content">
            <span className="stations-badge">{t('stations.hero.badge')}</span>
            <h1>{t('stations.hero.title')}</h1>
            <p>{t('stations.hero.text')}</p>
          </div>
        </div>
      </section>

      {/* CARTE */}
      <section className="stations-intro">
        <div className="container">
          <div className="section-heading">
            <h2>{t('stations.map.title')}</h2>
            <p>{t('stations.map.text')}</p>
          </div>

          <div className="map-wrapper">
            <TogoStationsMap stations={stations} />
          </div>
        </div>
      </section>

      {/* STATIONS */}
      <section className="stations-list">
        <div className="container">
          <div className="section-heading">
            <h2>{t('stations.list.title')}</h2>
          </div>

          <div className="stations-grid">
            {stations.map((station) => (
              <StationCard
                key={station.id}
                id={station.id}
                name={station.name}
                image={station.image}
                city={station.city}
                address={station.address}
                phone={station.phone}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="station-cta">
        <div className="container">
          <h2>{t('stations.cta.title')}</h2>
          <p>{t('stations.cta.text')}</p>

          <Link to="/contact" className="cta-btn">
            {t('stations.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Stations;
