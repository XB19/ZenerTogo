import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

function Affectations() {
  const { affectations } = useBackOfficeData();
  const sorted = [...affectations].sort((a, b) => new Date(b.dateAffectation) - new Date(a.dateAffectation));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Affectations</h1>
          <p>Historique des attributions de tickets aux agents.</p>
        </div>
      </div>

      <div className="card">
        {sorted.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-people-arrows"></i>
            Aucune affectation enregistrée.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Agent</th>
                  <th>Date d'affectation</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <strong>{a.ticket}</strong>
                    </td>
                    <td>
                      <span className="avatar-sm">{a.agent.slice(0, 1)}</span>
                      {a.agent}
                    </td>
                    <td>
                      {new Date(a.dateAffectation).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>
                      {a.statut === 'terminee' ? (
                        <span className="badge badge-green">Terminée</span>
                      ) : (
                        <span className="badge badge-blue">En cours</span>
                      )}
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

export default Affectations;
