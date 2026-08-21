import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function StationCard({ id, name, image, city, address, phone }) {
  const { t } = useTranslation();

  return (
    <article className="station-card">
      <Link to={`/stations/${id}`} className="station-image-link">
        <img src={image} alt={name} loading="lazy" />
      </Link>

      <div className="station-content">
        <h3>
          <Link to={`/stations/${id}`}>{name}</Link>
        </h3>
        <div className="station-city">{city}</div>
        {address && <p className="station-address">{address}</p>}

        {phone && (
          <a className="station-phone" href={`tel:${phone.replace(/\s+/g, '')}`} aria-label={t('stations.card.call')}>
            <i className="fa-solid fa-phone"></i>
            {phone}
          </a>
        )}
      </div>
    </article>
  );
}

export default StationCard;
