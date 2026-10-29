import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../components/ServiceCard.jsx';
import './Services.css';

function Services() {
  const { t } = useTranslation();

  const services = [
    { img: '/images/card1.jpg', title: t('services.grid.cards.fuel.title'), text: t('services.grid.cards.fuel.text') },
    { img: '/images/card2.jpg', title: t('services.grid.cards.gas.title'), text: t('services.grid.cards.gas.text') },
    { img: '/images/card4.jpg', title: t('services.grid.cards.lubricants.title'), text: t('services.grid.cards.lubricants.text') },
    { img: '/images/card3.jpg', title: t('services.grid.cards.proximity.title'), text: t('services.grid.cards.proximity.text') },
    { img: '/images/card5.jpg', title: t('services.grid.cards.environment.title'), text: t('services.grid.cards.environment.text') },
  ];

  const process = [
    { number: '01', title: t('services.process.steps.analysis') },
    { number: '02', title: t('services.process.steps.advice') },
    { number: '03', title: t('services.process.steps.implementation') },
    { number: '04', title: t('services.process.steps.monitoring') },
  ];

  return (
    <div className="page-services">
      {/* HERO */}
      <section className="services-hero">
        <div className="services-overlay"></div>

        <div className="container">
          <div className="services-hero-content">
            <span className="hero-badge">{t('services.hero.badge')}</span>
            <h1>{t('services.hero.title')}</h1>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="services-intro">
        <div className="container">
          <div className="intro-content">
            <h2>{t('services.intro.title')}</h2>
            <p>{t('services.intro.text')}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-grid-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.grid.sectionTitle')}</h2>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <ServiceCard key={s.title} img={s.img} title={s.title} text={s.text} />
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="why-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-image">
              <img src="/images/why-zener.png" alt="" />
            </div>

            <div className="why-content">
              <h2>{t('services.why.title')}</h2>

              <ul>
                <li>{t('services.why.items.network')}</li>
                <li>{t('services.why.items.products')}</li>
                <li>{t('services.why.items.service')}</li>
                <li>{t('services.why.items.innovation')}</li>
                <li>{t('services.why.items.team')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="process-section">
        <div className="container">
          <h2>{t('services.process.title')}</h2>

          <div className="process-grid">
            {process.map((p) => (
              <div className="process-card" key={p.number}>
                <span>{p.number}</span>
                <h3>{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <div className="container">
          <h2>{t('services.cta.title')}</h2>
          <p>{t('services.cta.text')}</p>

          <Link to="/contact" className="cta-btn">
            {t('services.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
