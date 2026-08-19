import { Link } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './CandidaturesList.css';

function CandidaturesList() {
  const { candidatures } = useAdminData();

  return (
    <div className="admin-page-candidatureslist">
      <div className="page-header">
        <div>
          <h1>Candidatures reçues</h1>
          <p>Consultez toutes les candidatures envoyées depuis le site ZENER.</p>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Candidat</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Offre</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidatures.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <i className="fa-solid fa-file-circle-xmark"></i>
                    <h3>Aucune candidature reçue</h3>
                    <p>Les futures candidatures apparaîtront ici automatiquement.</p>
                  </div>
                </td>
              </tr>
            ) : (
              candidatures.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="candidat">
                      <div className="avatar">{c.nom.slice(0, 1).toUpperCase()}</div>
                      <div>
                        <strong>{c.nom}</strong>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="email">{c.email}</span>
                  </td>

                  <td>{c.telephone}</td>

                  <td>
                    <span className="badge-job">{c.offre ? c.offre.titre : 'Candidature spontanée'}</span>
                  </td>

                  <td>
                    <span className="date">{new Date(c.created_at).toLocaleDateString('fr-FR')}</span>
                  </td>

                  <td>
                    <div className="actions">
                      <Link to={`/admin-panel/carrieres/candidatures/${c.id}`} className="btn-view">
                        Voir
                      </Link>

                      {c.cv && (
                        <a href={c.cv} target="_blank" rel="noreferrer" className="btn-cv">
                          CV
                        </a>
                      )}
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

export default CandidaturesList;
