import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Counter from '../components/Counter.jsx';
import './About.css';

function About() {
  const { t } = useTranslation();
  const metiersSwiperRef = useRef(null);

  const metiers = [
    { img: '/images/card3.jpg', title: t('about.subsidiaries.metiers.maritime.title'), text: t('about.subsidiaries.metiers.maritime.text') },
    { img: '/images/card1.jpg', title: t('about.subsidiaries.metiers.fuel.title'), text: t('about.subsidiaries.metiers.fuel.text') },
    { img: '/images/card2.jpg', title: t('about.subsidiaries.metiers.gas.title'), text: t('about.subsidiaries.metiers.gas.text') },
    {
      img: '/images/zencard_product.jpg',
      title: t('about.subsidiaries.metiers.cards.title'),
      subtitle: t('about.subsidiaries.metiers.cards.subtitle'),
      text: t('about.subsidiaries.metiers.cards.text'),
    },
    { img: '/images/card4.jpg', title: t('about.subsidiaries.metiers.lubricants.title'), text: t('about.subsidiaries.metiers.lubricants.text') },
  ];

  const profils = [
    { icon: 'fa-building', title: t('about.profile.cards.business.title'), text: t('about.profile.cards.business.text') },
    { icon: 'fa-utensils', title: t('about.profile.cards.horeca.title'), text: t('about.profile.cards.horeca.text') },
    { icon: 'fa-handshake', title: t('about.profile.cards.partners.title'), text: t('about.profile.cards.partners.text') },
  ];

  const aboutStats = [
    { target: 25, label: t('about.stats.stations') },
    { target: 15, label: t('about.stats.partners') },
    { target: 5000000, label: t('about.stats.clients') },
    { target: 15, label: t('about.stats.experience') },
  ];

  const digitalSolutions = [
    { icon: 'fa-credit-card', title: t('about.digital.cards.zencard.title'), text: t('about.digital.cards.zencard.text') },
    { icon: 'fa-users', title: t('about.digital.cards.zenfamili.title'), text: t('about.digital.cards.zenfamili.text') },
    { icon: 'fa-shield-halved', title: t('about.digital.cards.security.title'), text: t('about.digital.cards.security.text') },
    { icon: 'fa-route', title: t('about.digital.cards.zenmobility.title'), text: t('about.digital.cards.zenmobility.text') },
  ];

  useEffect(() => {
    if (!window.Swiper || !metiersSwiperRef.current) return undefined;

    const swiper = new window.Swiper(metiersSwiperRef.current, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: true,
      keyboard: { enabled: true },
      navigation: {
        nextEl: '.metiers-next',
        prevEl: '.metiers-prev',
      },
      pagination: {
        el: '.metiers-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },
    });

    return () => swiper.destroy(true, true);
  }, []);

  return (
    <div className="page-about">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-overlay"></div>

        <div className="container">
          <div className="about-hero-content">
            <span className="about-badge">{t('about.hero.badge')}</span>

            <h1>{t('about.hero.title')}</h1>

            <p>{t('about.hero.description')}</p>
          </div>
        </div>
      </section>

      {/* ZENER EN QUELQUES MOTS */}
      <section className="about-company">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/about-company.png" alt="" loading="lazy" />

              <div className="about-image-badge">
                <span className="about-image-badge-number">15+</span>
                <span className="about-image-badge-label">{t('about.company.badge')}</span>
              </div>
            </div>

            <div className="about-text">
              <span className="section-subtitle">{t('about.company.subtitle')}</span>

              <h2>{t('about.company.title')}</h2>

              <p>{t('about.company.p1')}</p>

              <p>{t('about.company.p2')}</p>

              <ul>
                <li>{t('about.company.list.quality')}</li>
                <li>{t('about.company.list.coverage')}</li>
                <li>{t('about.company.list.support')}</li>
                <li>{t('about.company.list.innovation')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {aboutStats.map((stat) => (
              <div className="stat-box" key={stat.label}>
                <Counter target={stat.target} />
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & STRATÉGIE */}
      <section className="zn-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/why-zener.png" alt="" loading="lazy" />
            </div>

            <div className="about-text">
              <span className="zn-eyebrow">{t('about.vision.eyebrow')}</span>
              <h2>{t('about.vision.title')}</h2>
              <p>{t('about.vision.p1')}</p>
              <p>{t('about.vision.p2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* GOUVERNANCE */}
      <section className="zn-section bg-light">
        <div className="container">
          <div className="about-grid reverse">
            <div className="about-image">
              <img src="/images/qualite2.jpg" alt="" loading="lazy" />
            </div>

            <div className="about-text">
              <span className="zn-eyebrow">{t('about.governance.eyebrow')}</span>
              <h2>{t('about.governance.title')}</h2>
              <p>{t('about.governance.p1')}</p>
              <p>{t('about.governance.p2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRÉSENCE GÉOGRAPHIQUE */}
      <section className="zn-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/station-banner.png" alt="" loading="lazy" />
            </div>

            <div className="about-text">
              <span className="zn-eyebrow">{t('about.presence.eyebrow')}</span>
              <h2>{t('about.presence.title')}</h2>
              <p>{t('about.presence.p1')}</p>
              <p>{t('about.presence.p2')}</p>

              <Link to="/stations" className="text-link">
                {t('about.presence.cta')} <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CARRIÈRES CHEZ ZENER */}
      <section className="zn-section bg-light">
        <div className="container">
          <div className="about-grid reverse">
            <div className="about-image">
              <img src="/images/career-team.png" alt="" loading="lazy" />
            </div>

            <div className="about-text">
              <span className="zn-eyebrow">{t('about.careers.eyebrow')}</span>
              <h2>{t('about.careers.title')}</h2>
              <p>{t('about.careers.text')}</p>

              <Link to="/carrieres" className="cta-btn">
                {t('about.careers.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NOS FILIALES & ENTITÉS */}
      <section className="zn-section">
        <div className="container">
          <div className="zn-section-header centered">
            <span className="zn-eyebrow">{t('about.subsidiaries.eyebrow')}</span>

            <h2>{t('about.subsidiaries.title')}</h2>

            <p>{t('about.subsidiaries.intro')}</p>
          </div>

          <div className="zn-section-header centered">
            <h3 className="metiers-subtitle">{t('about.subsidiaries.metiersTitle')}</h3>

            <p>{t('about.subsidiaries.metiersIntro')}</p>
          </div>

          <div className="expertise-slider">
            <button type="button" className="expertise-prev metiers-prev" aria-label={t('about.subsidiaries.prevAria')}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="swiper" ref={metiersSwiperRef}>
              <div className="swiper-wrapper">
                {metiers.map((m) => (
                  <article className="swiper-slide metiers-card" key={m.title}>
                    <img src={m.img} alt="" loading="lazy" />
                    <div className="card-overlay">
                      <h3>{m.title}</h3>
                      {m.subtitle && <h4>{m.subtitle}</h4>}
                      <p>{m.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button type="button" className="expertise-next metiers-next" aria-label={t('about.subsidiaries.nextAria')}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="expertise-pagination metiers-pagination" aria-label={t('about.subsidiaries.paginationAria')}></div>
          </div>
        </div>
      </section>

      {/* VOTRE PROFIL */}
      <section className="zn-section bg-light">
        <div className="container">
          <div className="zn-section-header centered">
            <span className="zn-eyebrow">{t('about.profile.eyebrow')}</span>
            <h2>{t('about.profile.title')}</h2>
          </div>

          <div className="zn-cards-grid cols-3">
            {profils.map((p) => (
              <div className="zn-card" key={p.title}>
                <div className="zn-card-icon">
                  <i className={`fa-solid ${p.icon}`}></i>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIGITAL ET INNOVATION */}
      <section className="zn-section bg-blue">
        <div className="container">
          <div className="zn-section-header centered">
            <span className="zn-eyebrow">{t('about.digital.eyebrow')}</span>

            <h2>{t('about.digital.title')}</h2>

            <p>{t('about.digital.p1')}</p>

            <p>{t('about.digital.p2')}</p>
          </div>

          <div className="zn-cards-grid">
            {digitalSolutions.map((d) => (
              <div className="zn-card" key={d.title}>
                <div className="zn-card-icon">
                  <i className={`fa-solid ${d.icon}`}></i>
                </div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLITIQUE ET RSE */}
      <section className="zn-section" id="politique-rse">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/station1.png" alt="" loading="lazy" />
            </div>

            <div className="about-text">
              <span className="zn-eyebrow">{t('about.rse.eyebrow')}</span>
              <h2>{t('about.rse.title')}</h2>
              <p>{t('about.rse.p1')}</p>
              <p>{t('about.rse.p2')}</p>
              <p>{t('about.rse.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <i className="fa-solid fa-bullseye"></i>
              <h3>{t('about.mission.mission.title')}</h3>
              <p>{t('about.mission.mission.text')}</p>
            </div>

            <div className="mission-card">
              <i className="fa-solid fa-eye"></i>
              <h3>{t('about.mission.vision.title')}</h3>
              <p>{t('about.mission.vision.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>{t('about.cta.title')}</h2>
          <p>{t('about.cta.text')}</p>

          <Link to="/contact" className="cta-btn">
            {t('about.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
