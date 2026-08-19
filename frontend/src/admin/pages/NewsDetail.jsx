import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './NewsDetail.css';

function NewsDetailAdmin() {
  const { id } = useParams();
  const { actualites, deleteActualite } = useAdminData();
  const navigate = useNavigate();
  const actualite = actualites.find((a) => String(a.id) === id);

  const handleDelete = () => {
    if (window.confirm('Supprimer cette actualité ?')) {
      deleteActualite(Number(id));
      navigate('/admin-panel/news');
    }
  };

  if (!actualite) {
    return (
      <div className="admin-page-newsdetail">
        <h1>Actualité introuvable</h1>
        <p>
          <Link to="/admin-panel/news">Retour</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="admin-page-newsdetail">
      <div className="page-header">
        <h1>Détail de l’actualité</h1>
        <p>Consulte et gère cette publication</p>
      </div>

      <div className="detail-card">
        {actualite.image && <img src={actualite.image} className="detail-image" alt="" />}

        <div className="detail-content">
          <span className="badge badge-blue">{actualite.categorie}</span>

          <div className="title">{actualite.titre}</div>

          <div className="meta">
            Publié le{' '}
            {new Date(actualite.created_at).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>

          <div className="content-text">
            {actualite.contenu.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="actions">
            <Link to="/admin-panel/news" className="btn-back">
              ← Retour
            </Link>

            <a
              href="#"
              className="btn-delete"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              Supprimer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetailAdmin;
