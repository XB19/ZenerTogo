import { Link, NavLink, Outlet } from 'react-router-dom';
import { useClientAuth } from './ClientAuthContext.jsx';
import './ClientPortalLayout.css';

const TABS = [
  { to: '/portail-client/profil', label: 'Mon profil', icon: 'fa-user' },
  { to: '/portail-client/zencards', label: 'Mes ZenCards', icon: 'fa-credit-card' },
  { to: '/portail-client/transactions', label: 'Mes transactions', icon: 'fa-receipt' },
  { to: '/portail-client/reclamations', label: 'Mes réclamations', icon: 'fa-headset' },
];

function ClientPortalLayout() {
  const { user, logout } = useClientAuth();

  return (
    <div className="client-portal-app">
      <header className="cp-header">
        <div className="cp-header-inner">
          <Link to="/portail-client/profil" className="cp-brand">
            <img src="/images/logo.png" alt="ZENER" />
            <div className="cp-brand-text">
              Portail Client
              <span>Espace personnel ZENER</span>
            </div>
          </Link>

          <div className="cp-user">
            <span className="cp-user-name">
              <i className="fa-solid fa-circle-user"></i> {user?.prenom} {user?.nom}
            </span>

            <a
              href="/"
              className="cp-logout"
              onClick={(e) => {
                e.preventDefault();
                logout();
                window.location.href = '/portail-client/connexion';
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Déconnexion
            </a>
          </div>
        </div>
      </header>

      <nav className="cp-tabs">
        <div className="cp-tabs-inner">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => `cp-tab${isActive ? ' active' : ''}`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="cp-content">
        <Outlet />
      </div>
    </div>
  );
}

export default ClientPortalLayout;
