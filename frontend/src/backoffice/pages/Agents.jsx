import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

const STATUT_LABEL = {
  disponible: 'Disponible',
  en_appel: 'En appel',
  pause: 'En pause',
  hors_ligne: 'Hors ligne',
};

const STATUT_BADGE = {
  disponible: 'badge-green',
  en_appel: 'badge-blue',
  pause: 'badge-orange',
  hors_ligne: 'badge-gray',
};

function Agents() {
  const { agents } = useBackOfficeData();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Agents</h1>
          <p>Équipe Customer Care et disponibilité en temps réel.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Agent</th>
                <th>Équipe</th>
                <th>Tickets traités</th>
                <th>Embauché le</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>
                    <span className="avatar-sm">{agent.nom.slice(0, 1)}</span>
                    <strong>{agent.nom}</strong>
                    <br />
                    <span style={{ color: '#94a3b8', fontSize: '12px', marginLeft: '44px' }}>{agent.email}</span>
                  </td>
                  <td>{agent.equipe}</td>
                  <td>{agent.ticketsTraites}</td>
                  <td>{new Date(agent.dateEmbauche).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className={`badge ${STATUT_BADGE[agent.statut]}`}>{STATUT_LABEL[agent.statut]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Agents;
