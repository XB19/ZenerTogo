import { Link } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './OffresList.css';

function OffresList() {
  const { offres, deleteOffre } = useAdminData();

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette offre ?')) {
      deleteOffre(id);
    }
  };

  return (
    <div className="admin-page-offreslist">
      <div className="page-header">
        <div>
          <h1>Gestion des offres</h1>
          <p>Publiez et gérez les offres d'emploi ZENER.</p>
        </div>

        <Link to="/admin-panel/carrieres/offres/ajouter" className="btn-primary">
          + Nouvelle offre
        </Link>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Poste</th>
              <th>Ville</th>
              <th>Contrat</th>
              <th>Département</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {offres.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">Aucune offre disponible pour le moment.</div>
                </td>
              </tr>
            ) : (
              offres.map((offre) => (
                <tr key={offre.id}>
                  <td>
                    <strong>{offre.titre}</strong>
                  </td>
                  <td>{offre.ville}</td>
                  <td>{offre.type_contrat}</td>
                  <td>{offre.departement}</td>
                  <td>
                    {offre.actif ? (
                      <span className="badge-success">Active</span>
                    ) : (
                      <span className="badge-danger">Fermée</span>
                    )}
                  </td>
                  <td>{new Date(offre.created_at).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/admin-panel/carrieres/offres/${offre.id}/modifier`} className="btn-edit">
                        Modifier
                      </Link>

                      <a
                        href="#"
                        className="btn-delete"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(offre.id);
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

export default OffresList;
