import { Link } from 'react-router-dom';
import Counter from '../components/Counter.jsx';
import './About.css';

function About() {
  return (
    <div className="page-about">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-overlay"></div>

        <div className="container">
          <div className="about-hero-content">
            <span className="about-badge">À PROPOS DE ZENER</span>

            <h1>Une entreprise engagée au service de l'énergie et du développement</h1>
          </div>
        </div>
      </section>

      {/* QUI SOMMES NOUS */}
      <section className="about-company">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/about-company.png" alt="" />
            </div>

            <div className="about-text">
              <span className="section-subtitle">Qui sommes-nous ?</span>

              <h2>Un acteur majeur de l'énergie au Togo</h2>

              <p>
                ZENER contribue activement au développement économique à travers un
                réseau de stations-services, des produits pétroliers de qualité et des
                services énergétiques de proximité.
              </p>

              <ul>
                <li>Qualité certifiée</li>
                <li>Couverture nationale</li>
                <li>Service client réactif</li>
                <li>Innovation permanente</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-box">
              <Counter target={25} />
              <p>Stations-services</p>
            </div>

            <div className="stat-box">
              <Counter target={15} />
              <p>Partenaires</p>
            </div>

            <div className="stat-box">
              <Counter target={5000000} />
              <p>Clients satisfaits</p>
            </div>

            <div className="stat-box">
              <Counter target={15} />
              <p>Années d'expérience</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="values-section">
        <div className="container">
          <div className="section-heading">
            <h2>Nos valeurs</h2>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <h3>Fiabilité</h3>
              <p>Des solutions énergétiques sûres et durables.</p>
            </div>

            <div className="value-card">
              <h3>Excellence</h3>
              <p>La qualité au cœur de toutes nos activités.</p>
            </div>

            <div className="value-card">
              <h3>Innovation</h3>
              <p>Développer les solutions de demain.</p>
            </div>

            <div className="value-card">
              <h3>Proximité</h3>
              <p>Être proche de nos clients partout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <h3>Notre mission</h3>
              <p>Fournir une énergie fiable, accessible et durable.</p>
            </div>

            <div className="mission-card">
              <h3>Notre vision</h3>
              <p>Devenir une référence énergétique en Afrique de l'Ouest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Construisons l'énergie de demain ensemble</h2>
          <p>Nous accompagnons vos besoins énergétiques partout au Togo.</p>

          <Link to="/contact" className="cta-btn">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
