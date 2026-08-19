import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  { img: '/images/card1.jpg', title: 'Distribution de carburants', text: 'Réseau national de stations-services offrant des carburants de qualité.' },
  { img: '/images/card2.jpg', title: 'Gaz domestique', text: 'Solutions énergétiques adaptées aux ménages.' },
  { img: '/images/card3.jpg', title: 'Lubrifiants', text: 'Produits performants pour véhicules et industries.' },
  { img: '/images/card4.jpg', title: 'Services de proximité', text: 'Des solutions innovantes pour simplifier le quotidien.' },
  { img: '/images/card5.jpg', title: 'Environnement & écosystème', text: 'Initiatives durables et actions en faveur de la préservation de l’environnement.' },
];

const process = [
  { number: '01', title: 'Analyse' },
  { number: '02', title: 'Conseil' },
  { number: '03', title: 'Mise en œuvre' },
  { number: '04', title: 'Suivi' },
];

function Services() {
  return (
    <div className="page-services">
      {/* HERO */}
      <section className="services-hero">
        <div className="services-overlay"></div>

        <div className="container">
          <div className="services-hero-content">
            <span className="hero-badge">NOS SERVICES</span>
            <h1>Des solutions énergétiques adaptées à vos besoins</h1>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="services-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Une expertise énergétique complète</h2>
            <p>
              Grâce à son réseau national et à son savoir-faire, ZENER propose des
              services de qualité répondant aux besoins des particuliers comme des
              professionnels.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-grid-section">
        <div className="container">
          <div className="section-header">
            <h2>Nos domaines d'intervention</h2>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <article className="service-card" key={s.title}>
                <img src={s.img} alt="" />
                <div className="service-content">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
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
              <h2>Pourquoi choisir ZENER ?</h2>

              <ul>
                <li>Réseau national performant</li>
                <li>Produits certifiés et fiables</li>
                <li>Service client réactif</li>
                <li>Innovation permanente</li>
                <li>Équipe expérimentée</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="process-section">
        <div className="container">
          <h2>Notre approche</h2>

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
          <h2>Besoin d'une solution énergétique ?</h2>
          <p>Nos équipes sont à votre disposition.</p>

          <Link to="/contact" className="cta-btn">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
