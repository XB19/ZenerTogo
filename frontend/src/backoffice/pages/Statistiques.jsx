import { useBackOfficeData } from '../BackOfficeDataContext.jsx';
import { dashboardStats } from '../../data/backOfficeMockData.js';
import './BackOfficePages.css';

function groupBy(list, key) {
  return list.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function BarList({ data, colors }) {
  const max = Math.max(...Object.values(data), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {Object.entries(data).map(([label, count]) => (
        <div key={label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>{label}</span>
            <span style={{ color: '#64748b' }}>{count}</span>
          </div>
          <div className="sla-bar">
            <div
              className="sla-bar-fill"
              style={{ width: `${(count / max) * 100}%`, background: colors || '#1b60ad' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Statistiques() {
  const { tickets, agents } = useBackOfficeData();

  const byCategorie = groupBy(tickets, 'categorie');
  const byStatut = groupBy(tickets, 'statut');
  const byAgent = groupBy(agents.map((a) => ({ agent: a.nom, ticketsTraites: a.ticketsTraites })), 'agent');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Statistiques</h1>
          <p>Indicateurs clés de performance du service client.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-label">Temps moyen de réponse</div>
          <div className="stat-value">{dashboardStats.tempsMoyenReponseMin} min</div>
        </div>

        <div className="stat-card green">
          <div className="stat-label">Taux de résolution SLA</div>
          <div className="stat-value">{dashboardStats.tauxResolutionSLA}%</div>
        </div>

        <div className="stat-card orange">
          <div className="stat-label">Satisfaction client</div>
          <div className="stat-value">{dashboardStats.satisfactionClient}/5</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Tickets résolus ce mois</div>
          <div className="stat-value">{dashboardStats.ticketsResolusMois}</div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Tickets par catégorie</h2>
        <BarList data={byCategorie} colors="#1b60ad" />
      </div>

      <div className="card">
        <h2 className="section-title">Tickets par statut</h2>
        <BarList data={byStatut} colors="#9fc63b" />
      </div>

      <div className="card">
        <h2 className="section-title">Tickets traités par agent (total)</h2>
        <BarList data={byAgent} colors="#2f7ecb" />
      </div>
    </div>
  );
}

export default Statistiques;
