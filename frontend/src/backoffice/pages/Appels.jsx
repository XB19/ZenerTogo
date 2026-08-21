import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

const STATUT_LABEL = { traite: 'Traité', manque: 'Manqué', en_cours: 'En cours' };
const STATUT_BADGE = { traite: 'badge-green', manque: 'badge-red', en_cours: 'badge-orange' };

function formatDuree(sec) {
  if (!sec) return '—';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

function Appels() {
  const { appels } = useBackOfficeData();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Appels</h1>
          <p>Journal des appels entrants du centre d'appels.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Heure</th>
                <th>Client</th>
                <th>Numéro</th>
                <th>Agent</th>
                <th>Motif</th>
                <th>Durée</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {appels.map((a) => (
                <tr key={a.id}>
                  <td>
                    {new Date(a.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>{a.client}</td>
                  <td>{a.numero}</td>
                  <td>{a.agent || '—'}</td>
                  <td>{a.motif}</td>
                  <td>{formatDuree(a.duree)}</td>
                  <td>
                    <span className={`badge ${STATUT_BADGE[a.statut]}`}>{STATUT_LABEL[a.statut]}</span>
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

export default Appels;
