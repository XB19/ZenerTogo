import { useClientData } from '../ClientDataContext.jsx';
import './ClientPortalPages.css';

function formatFCFA(n) {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toLocaleString('fr-FR')} FCFA`;
}

function MyTransactions() {
  const { transactions } = useClientData();

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h1 className="cp-page-title">Mes transactions</h1>
      <p className="cp-page-subtitle">Historique de vos achats et recharges ZenCard.</p>

      <div className="cp-card">
        {sorted.length === 0 ? (
          <div className="cp-empty">
            <i className="fa-solid fa-receipt"></i>
            Aucune transaction pour le moment.
          </div>
        ) : (
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>ZenCard</th>
                  <th>Lieu / Type</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      {new Date(tx.date).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>{tx.zencardNumero}</td>
                    <td>
                      {tx.type}
                      <br />
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>{tx.station}</span>
                    </td>
                    <td>
                      <span className={tx.montant >= 0 ? 'cp-amount-pos' : 'cp-amount-neg'}>
                        {formatFCFA(tx.montant)}
                      </span>
                    </td>
                    <td>
                      {tx.statut === 'validee' ? (
                        <span className="cp-badge cp-badge-green">Validée</span>
                      ) : (
                        <span className="cp-badge cp-badge-orange">En attente</span>
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

export default MyTransactions;
