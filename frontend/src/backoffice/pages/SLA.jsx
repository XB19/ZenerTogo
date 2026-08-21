import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

function slaState(ticket) {
  if (ticket.statut === 'resolu' || ticket.statut === 'ferme') {
    return { label: 'Respecté', badge: 'badge-green' };
  }
  const echeance = new Date(ticket.slaEcheance);
  const now = new Date();
  if (echeance < now) return { label: 'Dépassé', badge: 'badge-red' };

  const hoursLeft = (echeance - now) / 36e5;
  if (hoursLeft < 4) return { label: `${Math.round(hoursLeft)}h restantes`, badge: 'badge-orange' };
  return { label: `${Math.round(hoursLeft)}h restantes`, badge: 'badge-blue' };
}

function SLA() {
  const { tickets, slaPolicies } = useBackOfficeData();

  const activeTickets = tickets.filter((t) => t.statut !== 'ferme');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>SLA</h1>
          <p>Politiques de délai et suivi du respect des engagements.</p>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Politiques SLA par catégorie / priorité</h2>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Priorité</th>
                <th>Délai de 1ère réponse</th>
                <th>Délai de résolution</th>
              </tr>
            </thead>
            <tbody>
              {slaPolicies.map((p) => (
                <tr key={p.id}>
                  <td>{p.categorie}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.priorite === 'haute' ? 'badge-red' : p.priorite === 'normale' ? 'badge-blue' : 'badge-gray'
                      }`}
                    >
                      {p.priorite}
                    </span>
                  </td>
                  <td>{p.delaiReponse}</td>
                  <td>{p.delaiResolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Tickets actifs et échéance SLA</h2>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Client</th>
                <th>Priorité</th>
                <th>Échéance</th>
                <th>État SLA</th>
              </tr>
            </thead>
            <tbody>
              {activeTickets.map((t) => {
                const state = slaState(t);
                return (
                  <tr key={t.id}>
                    <td>
                      <strong>{t.numero}</strong>
                    </td>
                    <td>{t.client}</td>
                    <td>{t.priorite}</td>
                    <td>
                      {new Date(t.slaEcheance).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>
                      <span className={`badge ${state.badge}`}>{state.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SLA;
