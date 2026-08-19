import { Link } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './NewsList.css';

function NewsList() {
  const { actualites, deleteActualite } = useAdminData();

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette actualité ?')) {
      deleteActualite(id);
    }
  };

  return (
    <div className="admin-page-newslist">
      <div className="page-header">
        <div>
          <h1>Actualités</h1>
          <p>Gérez les articles et publications affichés sur le site.</p>
        </div>

        <Link to="/admin-panel/news/create" className="btn-add">
          + Nouvelle actualité
        </Link>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {actualites.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <i className="fa-solid fa-newspaper"></i>
                    <h3>Aucune actualité</h3>
                    <p>Créez votre première actualité pour l’afficher sur le site.</p>
                  </div>
                </td>
              </tr>
            ) : (
              actualites.map((item) => (
                <tr key={item.id}>
                  <td>{item.image && <img src={item.image} className="news-img" alt="" />}</td>
                  <td>
                    <strong>{item.titre}</strong>
                  </td>
                  <td>
                    <span className="badge badge-blue">{item.categorie}</span>
                  </td>
                  <td>{new Date(item.created_at).toLocaleDateString('fr-FR')}</td>
                  <td>
                    {item.actif ?? true ? (
                      <span className="badge badge-green">Actif</span>
                    ) : (
                      <span className="badge">Inactif</span>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      <Link to={`/admin-panel/news/${item.id}`} className="btn-view">
                        Voir
                      </Link>

                      <a
                        href="#"
                        className="btn-delete"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(item.id);
                        }}
                      >
                        Supprimer
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsList;
