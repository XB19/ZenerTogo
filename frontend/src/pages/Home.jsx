import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter.jsx';
import TestimonialSlider from '../components/TestimonialSlider.jsx';
import { shopProducts } from '../data/mockData.js';

const expertiseCards = [
  { img: '/images/card1.jpg', title: 'Distribution de carburants', text: "Réseau national de stations-services assurant une distribution fiable." },
  { img: '/images/card2.jpg', title: 'Gaz & énergie domestique', text: 'Solutions énergétiques adaptées aux besoins des ménages.' },
  { img: '/images/card3.jpg', title: 'Mobilité & services', text: 'Services innovants pour particuliers et entreprises.' },
  { img: '/images/card4.jpg', title: 'Lubrifiants & accessoires', text: 'Produits professionnels haute performance.' },
  { img: '/images/card5.jpg', title: 'Environnement & écosystème', text: 'Initiatives durables et actions en faveur de la préservation de l’environnement.' },
  { img: '/images/card1.jpg', title: 'Distribution de carburants', text: 'Réseau national de stations-services.' },
  { img: '/images/card2.jpg', title: 'Gaz & énergie domestique', text: 'Solutions énergétiques adaptées.' },
  { img: '/images/card3.jpg', title: 'Mobilité & services', text: 'Services innovants.' },
  { img: '/images/card4.jpg', title: 'Lubrifiants & accessoires', text: 'Produits professionnels.' },
  { img: '/images/card5.jpg', title: 'Environnement & écosystème', text: 'Initiatives durables et actions environnementales.' },
];

function Home() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!window.Swiper || !swiperRef.current) return undefined;

    const swiper = new window.Swiper(swiperRef.current, {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
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
  }, []);

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
              <strong>L'énergie</strong> qui
            </span>
            <span className="hero-line">accompagne le</span>
            <span className="hero-line hero-bold">développement</span>
            <span className="hero-line">
              du <strong>Togo</strong>
            </span>
          </h1>

          <p className="hero-description">
            ZENER met à la disposition des particuliers, entreprises et industries des
            solutions énergétiques fiables à travers un réseau de stations-services, de
            produits pétroliers et de services de proximité sur toute l'étendue du
            territoire.
          </p>

          <div className="hero-buttons">
            <Link to="/services" className="hero-btn">
              Explorer nos solutions
            </Link>
            <Link to="/zencard" className="hero-btn hero-btn-outline">
              Obtenir sa ZenCard
            </Link>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="presentation container">
        <div className="section-badge">Un acteur majeur du secteur énergétique au Togo</div>

        <div className="presentation-grid">
          <div className="presentation-image">
            <img src="/images/station.png" alt="Station Zener" />
          </div>

          <div className="presentation-text">
            <p>
              Depuis plusieurs années, ZENER s'engage à fournir des produits et services
              énergétiques de qualité répondant aux besoins des ménages, des entreprises
              et des institutions. Notre ambition est de contribuer durablement au
              développement économique et social du pays grâce à une énergie accessible,
              performante et responsable.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-wrapper">
          <div className="stat-item">
            <div className="stat-circle">
              +
              <Counter target={25} />
            </div>
            <p>Stations-services</p>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-item">
            <div className="stat-circle">
              +
              <Counter target={20} />
            </div>
            <p>Partenaires</p>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-item">
            <div className="stat-circle">
              +
              <Counter target={20} />
            </div>
            <p>Années d'expérience</p>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="expertise-section">
        <div className="expertise-container">
          <div className="section-title">Nos domaines d'expertise</div>

          <div className="expertise-slider">
            <div className="expertise-track">
              {expertiseCards.map((card, i) => (
                <article className="expertise-card" key={i}>
                  <img src={card.img} alt="" />
                  <div className="card-overlay">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="expertise-banner">
        <div className="expertise-banner-overlay"></div>

        <div className="expertise-banner-content">
          <div className="banner-title">Nos stations sur le territoire togolais</div>

          <p>
            Grâce à notre réseau de stations-services réparties sur le territoire
            national, nous garantissons une proximité et une disponibilité permanente de
            nos produits et services.
          </p>

          <Link to="/stations" className="banner-btn">
            Voir toutes nos stations
          </Link>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="engagements container">
        <div className="section-title">Nos engagements</div>

        <div className="engagements-grid">
          <article className="engagement-card">
            <img src="/images/station1.png" alt="Qualité" />
            <div className="engagement-content">
              <h3>Qualité</h3>
              <p>
                Nous garantissons des produits et services conformes aux normes les plus
                exigeantes du secteur.
              </p>
            </div>
          </article>

          <article className="engagement-card">
            <img src="/images/securite.jpg" alt="Sécurité" />
            <div className="engagement-content">
              <h3>Sécurité</h3>
              <p>
                La protection de nos clients, collaborateurs et infrastructures demeure
                notre priorité absolue.
              </p>
            </div>
          </article>

          <article className="engagement-card">
            <img src="/images/qualite2.jpg" alt="Responsabilité" />
            <div className="engagement-content">
              <h3>Responsabilité</h3>
              <p>
                Nous favorisons un développement durable à travers des actions
                responsables et respectueuses de l’environnement.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* BOUTIQUE */}
      <section className="shop-section">
        <div className="shop-title">NOTRE ESPACE BOUTIQUE</div>

        <div className="container">
          <div className="shop-slider-wrapper">
            <div className="swiper shopSwiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {shopProducts.map((product) => (
                  <div className="swiper-slide" key={product.id}>
                    <div className="shop-product-card">
                      <img src={product.image} alt="" />
                      <h4>{product.name}</h4>
                      <span>{product.price}</span>
                    </div>
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
            <Link to="/boutique" className="shop-btn">
              Voir la boutique
            </Link>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="news-section container">
        <div className="section-title">Nos Actualités</div>

        <div className="news-wrapper">
          <div className="news-grid">
            {[1, 2, 3].map((i) => (
              <article className="news-card" key={i}>
                <span>NEWS · 28.05.2024</span>
                <h3>POLITIQUE QHSE</h3>
                <p>Tous les jours, nous apportons de l'énergie au Togo et...</p>
                <a href="#">
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </article>
            ))}
          </div>

          <div className="news-btn-wrapper">
            <Link to="/actualites" className="news-btn">
              Toutes les actualités
            </Link>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonial-title">Ils nous font confiance</div>
        </div>

        <div className="testimonial-background">
          <div className="testimonial-wrapper">
            <div className="green-frame"></div>
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="partners-section">
        <div className="partners-divider">
          <div className="partners-title">Partenaires</div>
        </div>

        <div className="container">
          <div className="partners-grid">
            <img src="/client/images/partner1.png" alt="" />
            <img src="/client/images/partner2.png" alt="" />
            <img src="/client/images/partner3.png" alt="" />
            <img src="/client/images/partner4.png" alt="" />
            <img src="/client/images/partner5.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
