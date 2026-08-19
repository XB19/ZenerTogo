import { Link } from 'react-router-dom';
import { offres, candidatures, contactMessages } from '../../data/adminMockData.js';
import './Dashboard.css';

function Dashboard() {
  const offresCount = offres.length;
  const candidaturesCount = candidatures.length;
  const contactsCount = contactMessages.length;
  const stationsCount = 25;

  const offresActives = offres.filter((o) => o.actif).length;
  const pourcentageOffres = offres.length ? Math.round((offresActives / offres.length) * 100) : 0;

  const candidaturesTraitees = candidatures.filter((c) => c.traitee).length;
  const pourcentageCandidatures = candidatures.length
    ? Math.round((candidaturesTraitees / candidatures.length) * 100)
    : 0;

  const dernieresCandidatures = [...candidatures]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const derniersMessages = [...contactMessages]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 2);

  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="admin-page-dashboard dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Tableau de bord</h1>
          <p>Bienvenue dans l'administration ZENER</p>
        </div>

        <div className="dashboard-date">
          <i className="ri-calendar-line"></i>
          {today}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">
            <i className="ri-briefcase-4-line"></i>
          </div>
          <h3>Offres d'emploi</h3>
          <div className="stat-number">{offresCount}</div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">
            <i className="ri-file-user-line"></i>
          </div>
          <h3>Candidatures</h3>
          <div className="stat-number">{candidaturesCount}</div>
        </div>

        <div className="stat-card light">
          <div className="stat-icon">
            <i className="ri-gas-station-line"></i>
          </div>
          <h3>Stations</h3>
          <div className="stat-number">{stationsCount}</div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">
            <i className="ri-mail-line"></i>
          </div>
          <h3>Messages</h3>
          <div className="stat-number">{contactsCount}</div>
        </div>
      </div>

      {/* GRID */}
      <div className="dashboard-grid">
        <div className="dashboard-box">
          <div className="box-title">
            <h2>
              <i className="ri-pulse-line"></i>
              Activités récentes
            </h2>
          </div>

          <div className="activity-list">
            {dernieresCandidatures.map((c) => (
              <div className="activity-item" key={`cand-${c.id}`}>
                <div className="activity-icon">
                  <i className="ri-file-user-line"></i>
                </div>
                <div className="activity-text">
                  <h4>Nouvelle candidature reçue</h4>
                  <p>
                    {c.nom}
                    {c.offre && <> • {c.offre.titre}</>}
                  </p>
                </div>
              </div>
            ))}

            {derniersMessages.map((m) => (
              <div className="activity-item" key={`msg-${m.id}`}>
                <div className="activity-icon">
                  <i className="ri-mail-line"></i>
                </div>
                <div className="activity-text">
                  <h4>Nouveau message contact</h4>
                  <p>{m.nom}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="dashboard-box">
          <div className="box-title">
            <h2>
              <i className="ri-flashlight-line"></i>
              Accès rapide
            </h2>
          </div>

          <div className="quick-links">
            <Link to="/admin-panel/carrieres/offres/ajouter" className="quick-btn">
              <i className="ri-add-circle-line"></i>
              Ajouter une offre
            </Link>

            <Link to="/admin-panel/carrieres/offres" className="quick-btn">
              <i className="ri-briefcase-4-line"></i>
              Gérer les offres
            </Link>

            <Link to="/admin-panel/carrieres/candidatures" className="quick-btn">
              <i className="ri-team-line"></i>
              Voir les candidatures
            </Link>

            <Link to="/admin-panel/contact" className="quick-btn">
              <i className="ri-mail-line"></i>
              Messages reçus
            </Link>
          </div>
        </div>
      </div>

      {/* BAS */}
      <div className="bottom-grid">
        <div className="mini-box">
          <h3>
            <i className="ri-bar-chart-box-line"></i>
            Statistiques RH
          </h3>

          <div className="progress-item">
            <span>
              <strong>Candidatures traitées</strong>
              <strong>{pourcentageCandidatures}%</strong>
            </span>

            <div className="progress">
              <div className="progress-bar" style={{ width: `${pourcentageCandidatures}%` }}></div>
            </div>
          </div>

          <div className="progress-item">
            <span>
              <strong>Offres actives</strong>
              <strong>{pourcentageOffres}%</strong>
            </span>

            <div className="progress">
              <div className="progress-bar" style={{ width: `${pourcentageOffres}%` }}></div>
            </div>
          </div>
        </div>

        <div className="mini-box">
          <h3>
            <i className="ri-building-4-line"></i>
            ZENER en chiffres
          </h3>

          <ul className="dashboard-list">
            <li>
              <i className="ri-checkbox-circle-fill"></i>
              25 stations-services
            </li>
            <li>
              <i className="ri-checkbox-circle-fill"></i>
              Présence nationale
            </li>
            <li>
              <i className="ri-checkbox-circle-fill"></i>
              Réseau énergétique en croissance
            </li>
            <li>
              <i className="ri-checkbox-circle-fill"></i>
              Service client de proximité
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
