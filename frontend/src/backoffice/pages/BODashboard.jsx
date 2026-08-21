import { Link } from 'react-router-dom';
import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import { dashboardStats } from '../../data/backOfficeMockData.js';
import './BackOfficePages.css';

const STATUT_LABEL = { nouveau: 'Nouveau', en_cours: 'En cours', resolu: 'Résolu', ferme: 'Fermé' };
const STATUT_BADGE = {
  nouveau: 'badge-orange',
  en_cours: 'badge-blue',
  resolu: 'badge-green',
  ferme: 'badge-gray',
};

function BODashboard() {
  const { tickets, appels } = useBackOfficeData();

  const derniersTickets = [...tickets]
    .sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation))
    .slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Tableau de bord</h1>
          <p>Vue d'ensemble de l'activité Customer Care</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-label">Tickets ouverts</div>
          <div className="stat-value">{dashboardStats.ticketsOuverts}</div>
        </div>

        <div className="stat-card green">
          <div className="stat-label">Résolus ce mois</div>
          <div className="stat-value">{dashboardStats.ticketsResolusMois}</div>
        </div>

        <div className="stat-card orange">
          <div className="stat-label">Taux SLA respecté</div>
          <div className="stat-value">{dashboardStats.tauxResolutionSLA}%</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Appels aujourd'hui</div>
          <div className="stat-value">{dashboardStats.appelsAujourdhui}</div>
        </div>
      </div>

      <div className="card">
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Tickets récents</h2>
          <Link to="/back-office/tickets" className="btn-outline">
            Voir tous les tickets
          </Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Client</th>
                <th>Sujet</th>
                <th>Agent</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {derniersTickets.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.numero}</strong>
                  </td>
                  <td>{t.client}</td>
                  <td>{t.sujet}</td>
                  <td>{t.agentAssigne || '—'}</td>
                  <td>
                    <span className={`badge ${STATUT_BADGE[t.statut] || 'badge-gray'}`}>{STATUT_LABEL[t.statut] || t.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Derniers appels</h2>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Agent</th>
                <th>Motif</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {appels.slice(0, 5).map((a) => (
                <tr key={a.id}>
                  <td>{a.client}</td>
                  <td>{a.agent || '—'}</td>
                  <td>{a.motif}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.statut === 'traite' ? 'badge-green' : a.statut === 'manque' ? 'badge-red' : 'badge-orange'
                      }`}
                    >
                      {a.statut === 'traite' ? 'Traité' : a.statut === 'manque' ? 'Manqué' : 'En cours'}
                    </span>
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

export default BODashboard;
