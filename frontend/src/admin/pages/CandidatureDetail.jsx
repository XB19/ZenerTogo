import { Link, useParams } from 'react-router-dom';
import { useAdminData } from '../AdminDataContext.jsx';
import './CandidatureDetail.css';

function CandidatureDetail() {
  const { id } = useParams();
  const { candidatures } = useAdminData();
  const candidature = candidatures.find((c) => String(c.id) === id);

  if (!candidature) {
    return (
      <div className="admin-page-candidaturedetail">
        <h1>Candidature introuvable</h1>
        <p>
          <Link to="/admin-panel/carrieres/candidatures">Retour aux candidatures</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="admin-page-candidaturedetail">
      <Link to="/admin-panel/carrieres/candidatures" className="back-btn">
        ← Retour aux candidatures
      </Link>

      <div className="page-header">
        <h1>Détail de la candidature</h1>
        <p>Consultation complète du dossier candidat.</p>
      </div>

      <div className="candidature-layout">
        <div className="profile-card">
          <div className="profile-avatar">{candidature.nom.slice(0, 1).toUpperCase()}</div>
          <div className="profile-name">{candidature.nom}</div>

          {/* NB : le modèle Django JobApplication n'a pas de champ "poste",
              ce bloc affiche donc toujours "Candidature spontanée" dans le
              site d'origine, y compris pour les candidatures liées à une
              offre - comportement reproduit ici à l'identique. */}
          <div className="profile-job">
            {candidature.poste || 'Candidature spontanée'}
          </div>

          <span className="status-badge">Nouvelle candidature</span>
        </div>

        <div className="detail-card">
          <h2 className="section-title">Informations personnelles</h2>

          <div className="info-grid">
            <div className="info-box">
              <span className="info-label">Adresse email</span>
              <div className="info-value">{candidature.email}</div>
            </div>

            <div className="info-box">
              <span className="info-label">Téléphone</span>
              <div className="info-value">{candidature.telephone}</div>
            </div>

            <div className="info-box">
              <span className="info-label">Poste recherché</span>
              <div className="info-value">{candidature.poste}</div>
            </div>

            <div className="info-box">
              <span className="info-label">Date de candidature</span>
              <div className="info-value">{candidature.date_creation}</div>
            </div>
          </div>

          <h2 className="section-title">Motivation du candidat</h2>

          <div className="message-box">
            {candidature.message.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="documents">
            <h2 className="section-title">Documents joints</h2>

            <div className="document-actions">
              <a href={candidature.cv} target="_blank" rel="noreferrer" className="btn-download">
                📄 Télécharger le CV
              </a>

              {candidature.lettre_motivation && (
                <a href={candidature.lettre_motivation} target="_blank" rel="noreferrer" className="btn-secondary">
                  📝 Lettre de motivation
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatureDetail;
