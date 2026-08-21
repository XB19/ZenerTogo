import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ServiceCard({ img, title, text }) {
  const { t } = useTranslation();

  return (
    <article className="service-card">
      <img src={img} alt="" loading="lazy" />

      <div className="service-content">
        <h3>{title}</h3>
        <p className="clamp-3">{text}</p>

        <Link to="/contact" className="service-btn">
          {t('cards.learnMore')}
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
