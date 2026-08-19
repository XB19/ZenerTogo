import { Link, useParams } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './ZencardDetail.css';

function ZencardDetail() {
  const { id } = useParams();
  const { zencardDemandes, updateZencardStatut } = useAdminData();
  const demande = zencardDemandes.find((d) => String(d.id) === id);

  if (!demande) {
    return (
      <div className="admin-page-zencarddetail">
        <h1>Demande introuvable</h1>
        <p>
          <Link to="/admin-panel/zencard">Retour à la liste</Link>
        </p>
      </div>
    );
  }

  const handleAction = (action) => {
    updateZencardStatut(demande.id, action === 'valider' ? 'validee' : 'rejetee');
  };

  return (
    <div className="admin-page-zencarddetail">
      <div className="detail-card">
        <h1>Détails de la demande ZenCard</h1>

        <div className="section">
          <div className="info-row">
            <span className="label">Nom :</span> {demande.nom}
          </div>
          <div className="info-row">
            <span className="label">Téléphone :</span> {demande.telephone}
          </div>
          <div className="info-row">
            <span className="label">Email :</span> {demande.email}
          </div>
          <div className="info-row">
            <span className="label">Ville :</span> {demande.ville}
          </div>
          <div className="info-row">
            <span className="label">Type :</span> {demande.type_demande}
          </div>
          <div className="info-row">
            <span className="label">Station de retrait :</span> {demande.station_retrait}
          </div>
        </div>

        <div className="section">
          <div className="info-row">
            <span className="label">Pièce d'identité :</span>
            <br />
            <img src={demande.cni} className="cni-image" alt="" />
          </div>
        </div>

        <div className="section">
          <span className="label">Statut :</span>{' '}
          {demande.statut === 'en_attente' && (
            <span className="status-badge status-pending">En attente</span>
          )}
          {demande.statut === 'validee' && (
            <span className="status-badge status-approved">Validée</span>
          )}
          {demande.statut === 'rejetee' && (
            <span className="status-badge status-rejected">Rejetée</span>
          )}
        </div>

        {demande.statut === 'en_attente' ? (
          <div className="actions">
            <button type="button" className="btn btn-success" onClick={() => handleAction('valider')}>
              Valider la demande
            </button>
            <button type="button" className="btn btn-danger" onClick={() => handleAction('rejeter')}>
              Rejeter la demande
            </button>
          </div>
        ) : (
          <div className="disabled-box">Cette demande a déjà été traitée.</div>
        )}

        <div style={{ marginTop: '35px', display: 'flex', gap: '15px' }}>
          <Link to="/admin-panel/zencard" className="btn-back">
            ← Retour à la liste
          </Link>

          {demande.statut !== 'en_attente' && (
            <span style={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
              ✔ Demande traitée
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ZencardDetail;
