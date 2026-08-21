import { useState } from 'react';
import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import './BackOfficePages.css';

const STATUT_LABEL = { nouveau: 'Nouveau', en_cours: 'En cours', resolu: 'Résolu', ferme: 'Fermé' };
const STATUT_BADGE = { nouveau: 'badge-orange', en_cours: 'badge-blue', resolu: 'badge-green', ferme: 'badge-gray' };
const PRIORITE_BADGE = { haute: 'badge-red', normale: 'badge-blue', basse: 'badge-gray' };

function Tickets() {
  const { tickets, agents, assignTicket, updateTicketStatut } = useBackOfficeData();
  const [assignSelection, setAssignSelection] = useState({});

  const handleAssign = (ticketId) => {
    const agentNom = assignSelection[ticketId];
    if (agentNom) {
      assignTicket(ticketId, agentNom);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Tickets</h1>
          <p>Réclamations et demandes clients à traiter.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Client</th>
                <th>Sujet</th>
                <th>Canal</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Agent assigné</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <i className="fa-solid fa-ticket"></i>
                      Aucun ticket pour le moment.
                    </div>
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong>{t.numero}</strong>
                    </td>
                    <td>{t.client}</td>
                    <td>{t.sujet}</td>
                    <td>{t.canal}</td>
                    <td>
                      <span className={`badge ${PRIORITE_BADGE[t.priorite]}`}>{t.priorite}</span>
                    </td>
                    <td>
                      <select
                        value={t.statut}
                        onChange={(e) => updateTicketStatut(t.id, e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dbe4ef', fontSize: '13px' }}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="en_cours">En cours</option>
                        <option value="resolu">Résolu</option>
                        <option value="ferme">Fermé</option>
                      </select>
                    </td>
                    <td>
                      {t.agentAssigne || <span style={{ color: '#94a3b8' }}>Non assigné</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                          value={assignSelection[t.id] || ''}
                          onChange={(e) => setAssignSelection((s) => ({ ...s, [t.id]: e.target.value }))}
                          style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dbe4ef', fontSize: '13px' }}
                        >
                          <option value="">Assigner à...</option>
                          {agents.map((a) => (
                            <option key={a.id} value={a.nom}>
                              {a.nom}
                            </option>
                          ))}
                        </select>

                        <button type="button" className="btn-outline" onClick={() => handleAssign(t.id)}>
                          OK
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
