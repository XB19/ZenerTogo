import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Counter from '../components/Counter.jsx';
import FAQSection from '../components/FAQSection.jsx';
import useRevealOnScroll from '../hooks/useRevealOnScroll.js';
import { boutiqueProducts, actualites } from '../data/mockData.js';
import { faqs } from '../data/faq.js';
import { dateLocale, pickLang } from '../utils/i18nData.js';

const homeFaqIds = [3, 9, 6, 1, 5];

function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const stats = [
    { target: 3, prefix: '', icon: 'fa-earth-africa', label: t('home.stats.countries') },
    { target: 600, prefix: '+', icon: 'fa-users', label: t('home.stats.employees') },
    { target: 15, prefix: '+', icon: 'fa-hourglass-half', label: t('home.stats.experience') },
    { target: 5, prefix: '', icon: 'fa-briefcase', label: t('home.stats.businesses') },
  ];

  const expertiseCards = [
    { img: '/images/card1.jpg', title: t('home.expertise.cards.fuel.title'), text: t('home.expertise.cards.fuel.text') },
    { img: '/images/card2.jpg', title: t('home.expertise.cards.gas.title'), text: t('home.expertise.cards.gas.text') },
    { img: '/images/card3.jpg', title: t('home.expertise.cards.mobility.title'), text: t('home.expertise.cards.mobility.text') },
    { img: '/images/card4.jpg', title: t('home.expertise.cards.lubricants.title'), text: t('home.expertise.cards.lubricants.text') },
    { img: '/images/card5.jpg', title: t('home.expertise.cards.business.title'), text: t('home.expertise.cards.business.text') },
  ];

  const homeFaqs = homeFaqIds
    .map((id) => faqs.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => ({
      id: item.id,
      question: pickLang(item.question, lang),
      answer: pickLang(item.answer, lang),
    }));

  const swiperRef = useRef(null);
  const expertiseSwiperRef = useRef(null);
  const [presentationRef, presentationVisible] = useRevealOnScroll();
  const [statsRef, statsVisible] = useRevealOnScroll();

  useEffect(() => {
    if (!window.Swiper || !swiperRef.current) return undefined;

    const swiper = new window.Swiper(swiperRef.current, {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      speed: 700,
      navigation: {
        nextEl: '.shop-next',
        prevEl: '.shop-prev',
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });

    return () => swiper.destroy(true, true);
  }, [lang]);

  useEffect(() => {
    if (!window.Swiper || !expertiseSwiperRef.current) return undefined;

    const swiper = new window.Swiper(expertiseSwiperRef.current, {
      slidesPerView: 1,
      spaceBetween: 20,
      rewind: true,
      speed: 700,
      keyboard: { enabled: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        960: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
      a11y: {
        enabled: true,
        prevSlideMessage: t('home.expertise.prevAria'),
        nextSlideMessage: t('home.expertise.nextAria'),
      },
      navigation: {
        nextEl: '.expertise-next',
        prevEl: '.expertise-prev',
      },
      pagination: {
        el: '.expertise-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },
    });

    return () => swiper.destroy(true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline poster="/images/hero-zener.png">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-gradient"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line">
              <strong>{t('home.hero.titleLine1')}</strong>
            </span>
            <span className="hero-line hero-bold">{t('home.hero.titleLine2')}</span>
            <span className="hero-line hero-bold">{t('home.hero.titleLine3')}</span>
          </h1>

          <p className="hero-description">{t('home.hero.description')}</p>

          <div className="hero-buttons">
            <Link to="/services" className="hero-btn">
              {t('home.hero.exploreCta')}
            </Link>
            <Link to="/zencard" className="hero-btn hero-btn-outline">
              {t('home.hero.zencardCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="presentation container">
        <div className="section-badge">
          <span className="badge-dot"></span>
          {t('home.presentation.badge')}
        </div>

        <div
          className={`presentation-grid reveal-on-scroll${presentationVisible ? ' is-visible' : ''}`}
          ref={presentationRef}
        >
          <div className="presentation-image">
            <img src="/images/station.png" alt="Station Zener" />
          </div>

          <div className="presentation-text">
            <i className="fa-solid fa-quote-right quote-icon"></i>
            <p>{t('home.presentation.text')}</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div
          className={`stats-wrapper reveal-on-scroll${statsVisible ? ' is-visible' : ''}`}
          ref={statsRef}
        >
          {stats.map((stat, i) => (
            <div className="stat-item" key={stat.label} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="stat-circle">
                <i className={`fa-solid ${stat.icon} stat-icon`}></i>
                <span className="stat-number">
                  {stat.prefix}
                  <Counter target={stat.target} />
                </span>
              </div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="expertise-section">
        <div className="expertise-container">
          <div className="section-title">{t('home.expertise.sectionTitle')}</div>

          <p className="expertise-subtitle">{t('home.expertise.subtitle')}</p>

          <h3 className="expertise-label">{t('home.expertise.label')}</h3>

          <div className="expertise-slider">
            <button type="button" className="expertise-prev" aria-label={t('home.expertise.prevAria')}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="swiper expertiseSwiper" ref={expertiseSwiperRef}>
              <div className="swiper-wrapper">
                {expertiseCards.map((card, i) => (
                  <article className="swiper-slide expertise-card" key={i}>
                    <img src={card.img} alt="" loading="lazy" />
                    <div className="card-overlay">
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button type="button" className="expertise-next" aria-label={t('home.expertise.nextAria')}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="expertise-pagination" aria-label={t('home.expertise.paginationAria')}></div>
          </div>
        </div>
      </section>

      <section className="expertise-banner">
        <div className="expertise-banner-overlay"></div>

        <div className="expertise-banner-content">
          <div className="banner-title">{t('home.banner.title')}</div>

          <p>{t('home.banner.text')}</p>

          <Link to="/stations" className="banner-btn">
            {t('home.banner.cta')}
          </Link>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="engagements container">
        <div className="section-title">{t('home.engagements.sectionTitle')}</div>

        <div className="engagements-grid">
          <article className="engagement-card">
            <img src="/images/station1.png" alt={t('home.engagements.quality.title')} />
            <div className="engagement-content">
              <h3>{t('home.engagements.quality.title')}</h3>
              <p>{t('home.engagements.quality.text')}</p>
            </div>
          </article>

          <article className="engagement-card">
            <img src="/images/securite.jpg" alt={t('home.engagements.security.title')} />
            <div className="engagement-content">
              <h3>{t('home.engagements.security.title')}</h3>
              <p>{t('home.engagements.security.text')}</p>
            </div>
          </article>

          <article className="engagement-card">
            <img src="/images/qualite2.jpg" alt={t('home.engagements.responsibility.title')} />
            <div className="engagement-content">
              <h3>{t('home.engagements.responsibility.title')}</h3>
              <p>{t('home.engagements.responsibility.text')}</p>
            </div>
          </article>
        </div>
      </section>

      {/* BOUTIQUE */}
      <section className="shop-section">
        <p className="shop-eyebrow">{t('boutique.home.eyebrow')}</p>
        <div className="shop-title">{t('home.shop.title')}</div>

        <div className="container">
          <div className="shop-slider-wrapper">
            <div className="swiper shopSwiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {boutiqueProducts.map((product) => (
                  <div className="swiper-slide" key={product.id}>
                    <Link to={`/produits/${product.slug}`} className="shop-product-card">
                      {product.discount && <span className="product-discount-badge">{product.discount}</span>}
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="shop-product-brand">{t(`boutique.options.marque.${product.brand}`)}</span>
                      <h4>{product.name}</h4>
                      <span className="product-price-row">
                        {product.oldPrice && <span className="product-old-price">{product.oldPrice}</span>}
                        <span className="product-price">{product.price}</span>
                      </span>
                      <span className="shop-product-view">
                        {t('boutique.card.view')} <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="shop-prev">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div className="shop-next">
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          <div className="shop-footer">
            <Link to="/produits" className="shop-btn">
              {t('boutique.home.viewAll')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="news-section container">
        <div className="section-title">{t('home.news.sectionTitle')}</div>

        <div className="news-wrapper">
          <div className="news-grid">
            {actualites.slice(0, 3).map((item) => (
              <Link to={`/news/${item.id}`} className="news-card" key={item.id}>
                <div className="news-card-image">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <div className="news-card-body">
                  <span>
                    {t('home.news.badge')} · {new Date(item.created_at).toLocaleDateString(dateLocale(lang))}
                  </span>
                  <h3>{pickLang(item.titre, lang)}</h3>
                  <p>{pickLang(item.contenu, lang).replace(/^## /gm, '')}</p>
                  <span className="news-card-arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="news-btn-wrapper">
            <Link to="/actualites" className="news-btn">
              {t('home.news.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="home-faq container">
        <div className="section-title">{t('home.faq.sectionTitle')}</div>

        <div className="home-faq-list">
          <FAQSection items={homeFaqs} />
        </div>

        <div className="home-faq-more">
          <Link to="/faq" className="news-btn">
            {t('home.faq.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
