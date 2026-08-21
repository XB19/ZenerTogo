import { Link } from 'react-router-dom';
import { useClientData } from '../ClientDataContext.jsx';
import './ClientPortalPages.css';

function formatFCFA(n) {
  return `${n.toLocaleString('fr-FR')} FCFA`;
}

function MyZencards() {
  const { zencards } = useClientData();

  return (
    <div>
      <div className="cp-flex-between">
        <div>
          <h1 className="cp-page-title">Mes ZenCards</h1>
          <p className="cp-page-subtitle" style={{ marginBottom: 0 }}>
            Retrouvez toutes vos cartes ZenCard actives et leur solde.
          </p>
        </div>

        <Link to="/zencard" className="cp-btn-secondary">
          <i className="fa-solid fa-plus"></i>
          Demander une nouvelle ZenCard
        </Link>
      </div>

      {zencards.length === 0 ? (
        <div className="cp-card">
          <div className="cp-empty">
            <i className="fa-solid fa-credit-card"></i>
            Vous n'avez pas encore de ZenCard.
          </div>
        </div>
      ) : (
        <div className="cp-zencards-grid">
          {zencards.map((card) => (
            <div className="cp-zencard" key={card.id}>
              <div className="cp-zencard-type">ZenCard {card.type}</div>
              <div className="cp-zencard-number">{card.numero}</div>

              <div className="cp-zencard-footer">
                <div>
                  <div className="cp-zencard-balance-label">Solde disponible</div>
                  <div className="cp-zencard-balance">{formatFCFA(card.solde)}</div>
                </div>

                <span className="cp-zencard-status">
                  {card.statut === 'active' ? 'Active' : card.statut}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cp-card" style={{ marginTop: '25px' }}>
        <h2 className="cp-section-title">Détails</h2>

        <div className="cp-table-wrap">
          <table className="cp-table">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Type</th>
                <th>Station préférée</th>
                <th>Activation</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {zencards.map((card) => (
                <tr key={card.id}>
                  <td>
                    <strong>{card.numero}</strong>
                  </td>
                  <td>{card.type}</td>
                  <td>{card.stationPreferee}</td>
                  <td>{new Date(card.dateActivation).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className="cp-badge cp-badge-green">Active</span>
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

export default MyZencards;
