import { Link, useParams } from 'react-router-dom';
import { useClientData } from '../ClientDataContext.jsx';
import './ClientPortalPages.css';

const STATUT_BADGE = {
  ouverte: 'cp-badge-orange',
  en_cours: 'cp-badge-blue',
  resolue: 'cp-badge-green',
  fermee: 'cp-badge-gray',
};

const STATUT_LABEL = {
  ouverte: 'Ouverte',
  en_cours: 'En cours',
  resolue: 'Résolue',
  fermee: 'Fermée',
};

function ReclamationDetail() {
  const { id } = useParams();
  const { reclamations } = useClientData();
  const reclamation = reclamations.find((r) => String(r.id) === id);

  if (!reclamation) {
    return (
      <div className="cp-card">
        <h1 className="cp-page-title">Réclamation introuvable</h1>
        <p>
          <Link to="/portail-client/reclamations">← Retour à mes réclamations</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/portail-client/reclamations" className="cp-btn-secondary" style={{ marginBottom: '25px' }}>
        ← Retour à mes réclamations
      </Link>

      <div className="cp-flex-between" style={{ marginTop: '20px' }}>
        <div>
          <h1 className="cp-page-title">{reclamation.sujet}</h1>
          <p className="cp-page-subtitle" style={{ marginBottom: 0 }}>
            {reclamation.numero} — {reclamation.categorie}
          </p>
        </div>

        <span className={`cp-badge ${STATUT_BADGE[reclamation.statut] || 'cp-badge-gray'}`}>
          {STATUT_LABEL[reclamation.statut] || reclamation.statut}
        </span>
      </div>

      <div className="cp-grid-2">
        <div className="cp-card">
          <h2 className="cp-section-title">Description</h2>
          <p style={{ color: '#334155', lineHeight: 1.8 }}>{reclamation.description}</p>

          <div style={{ marginTop: '20px', color: '#94a3b8', fontSize: '13px' }}>
            Créée le{' '}
            {new Date(reclamation.dateCreation).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>

        <div className="cp-card">
          <h2 className="cp-section-title">Suivi</h2>

          <div className="cp-timeline">
            {reclamation.historique.map((h, i) => (
              <div className="cp-timeline-item" key={i}>
                <div className="cp-timeline-dot"></div>
                <div className="cp-timeline-content">
                  <div className="cp-timeline-date">
                    {new Date(h.date).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="cp-timeline-author">{h.auteur}</div>
                  <div>{h.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReclamationDetail;
