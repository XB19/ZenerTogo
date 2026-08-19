import { Link } from 'react-router-dom';
import { actualites } from '../data/mockData.js';
import './Actualites.css';

function truncateWords(text, count) {
  const words = text.trim().split(/\s+/);
  if (words.length <= count) return text;
  return words.slice(0, count).join(' ') + '…';
}

function Actualites() {
  return (
    <div className="page-actualites">
      {/* HERO */}
      <section className="news-hero">
        <div className="news-overlay"></div>

        <div className="container">
          <div className="news-hero-content">
            <span className="news-badge">ACTUALITÉS ZENER</span>
            <h1>Suivez les dernières informations et événements de ZENER</h1>
            <p>
              Découvrez nos actualités, nos initiatives, nos projets et les événements
              qui marquent la vie de notre entreprise.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="news-intro">
        <div className="container">
          <div className="news-intro-content">
            <span className="section-subtitle">Nos publications</span>
            <h2>Toute l'actualité de ZENER</h2>
            <p>
              Retrouvez régulièrement les dernières nouvelles concernant nos activités,
              nos innovations, nos engagements et les évolutions du secteur énergétique
              au Togo.
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="news-section">
        <div className="container">
          <div className="news-grid">
            {actualites.length === 0 ? (
              <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>
                Aucune actualité disponible pour le moment.
              </p>
            ) : (
              actualites.map((act) => (
                <article className="news-card" key={act.id}>
                  <img src={act.image || '/images/news1.jpg'} alt={act.titre} />

                  <div className="news-content">
                    <div className="news-meta">
                      {act.categorie} • {new Date(act.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>

                    <h3>{act.titre}</h3>
                    <p>{truncateWords(act.contenu, 25)}</p>

                    <Link to={`/news/${act.id}`} className="news-btn">
                      Lire l'article →
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="news-cta">
        <div className="container">
          <h2>Restons connectés</h2>
          <p>Suivez toutes les actualités de ZENER et nos prochains événements.</p>

          <Link to="/contact" className="cta-btn">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Actualites;
