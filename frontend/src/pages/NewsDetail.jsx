import { Link, useParams } from 'react-router-dom';
import { actualites } from '../data/mockData.js';
import './NewsDetail.css';

function NewsDetail() {
  const { id } = useParams();
  const actualite = actualites.find((a) => String(a.id) === id);

  if (!actualite) {
    return (
      <div className="page-newsdetail news-container">
        <h1>Actualité introuvable</h1>
        <p>
          <Link to="/actualites">Retour aux actualités</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page-newsdetail news-container">
      <div className="badge">{actualite.categorie}</div>

      <div className="news-hero">
        <img src={actualite.image || '/images/news1.jpg'} alt={actualite.titre} />

        <div className="news-hero-overlay"></div>

        <div className="news-hero-text">
          <h1>{actualite.titre}</h1>

          <div className="news-meta">
            <span>
              📅{' '}
              {new Date(actualite.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span>• ZENER Actualités</span>
          </div>
        </div>
      </div>

      <div className="news-body">
        {actualite.contenu.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="back-area">
        <Link to="/actualites" className="back-btn">
          ← Retour aux actualités
        </Link>

        <div className="share">
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
