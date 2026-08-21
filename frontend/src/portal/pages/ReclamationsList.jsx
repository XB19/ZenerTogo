import { Link } from 'react-router-dom';
import { useClientData } from '../ClientDataContext.jsx';
import './ClientPortalPages.css';

const STATUT_BADGE = {
  ouverte: 'cp-badge-orange',
  en_cours: 'cp-badge-blue',
  resolue: 'cp-badge-green',
  fermee: 'cp-badge-gray',
};

const STATUT_LABEL = {
  ouverte: 'Ouverte',
  en_cours: 'En cours',
  resolue: 'Résolue',
  fermee: 'Fermée',
};

function ReclamationsList() {
  const { reclamations } = useClientData();
  const sorted = [...reclamations].sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));

  return (
    <div>
      <div className="cp-flex-between">
        <div>
          <h1 className="cp-page-title">Mes réclamations</h1>
          <p className="cp-page-subtitle" style={{ marginBottom: 0 }}>
            Suivez l'état de vos réclamations ou créez-en une nouvelle.
          </p>
        </div>

        <Link to="/portail-client/reclamations/nouvelle" className="cp-btn-primary">
          <i className="fa-solid fa-plus"></i>
          Créer une réclamation
        </Link>
      </div>

      <div className="cp-card">
        {sorted.length === 0 ? (
          <div className="cp-empty">
            <i className="fa-solid fa-headset"></i>
            Vous n'avez déposé aucune réclamation.
          </div>
        ) : (
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Sujet</th>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.numero}</strong>
                    </td>
                    <td>{r.sujet}</td>
                    <td>{r.categorie}</td>
                    <td>{new Date(r.dateCreation).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <span className={`cp-badge ${STATUT_BADGE[r.statut] || 'cp-badge-gray'}`}>
                        {STATUT_LABEL[r.statut] || r.statut}
                      </span>
                    </td>
                    <td>
                      <Link to={`/portail-client/reclamations/${r.id}`} className="cp-btn-secondary" style={{ padding: '8px 16px' }}>
                        Suivre
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReclamationsList;
