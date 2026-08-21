import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useBackOfficeAuth } from './BackOfficeAuthContext.jsx';
import './BackOfficeLayout.css';

const MENU = [
  { to: '/back-office', label: 'Tableau de bord', icon: 'fa-gauge-high' },
  { to: '/back-office/agents', label: 'Agents', icon: 'fa-headset' },
  { to: '/back-office/appels', label: 'Appels', icon: 'fa-phone' },
  { to: '/back-office/tickets', label: 'Tickets', icon: 'fa-ticket' },
  { to: '/back-office/affectations', label: 'Affectations', icon: 'fa-people-arrows' },
  { to: '/back-office/sla', label: 'SLA', icon: 'fa-stopwatch' },
  { to: '/back-office/zencard', label: 'ZenCard', icon: 'fa-credit-card' },
  { to: '/back-office/sap', label: 'SAP', icon: 'fa-database' },
  { to: '/back-office/statistiques', label: 'Statistiques', icon: 'fa-chart-line' },
  { to: '/back-office/reporting', label: 'Reporting', icon: 'fa-file-lines' },
];

function BackOfficeLayout() {
  const { user, logout } = useBackOfficeAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992) closeSidebar();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="backoffice-app">
    <div className="admin-layout">
      <aside className={`sidebar${sidebarOpen ? ' active' : ''}`} id="boSidebar">
        <div className="logo">
          <img src="/images/logo.png" alt="ZENER" />
          <span>Customer Care</span>
        </div>

        <ul className="menu">
          {MENU.map((item) => (
            <li key={item.to}>
              <Link to={item.to} onClick={closeSidebar}>
                <i className={`fa-solid ${item.icon}`}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidebar-logout">
          <a
            href="/back-office/connexion"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Déconnexion
          </a>
        </div>
      </aside>

      <div
        className={`admin-overlay${sidebarOpen ? ' active' : ''}`}
        onClick={closeSidebar}
      ></div>

      <div className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              type="button"
              className="sidebar-toggle"
              aria-label="Ouvrir le menu"
              aria-controls="boSidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className="page-title">Customer Care</div>
          </div>

          <div className="admin-user">
            <div className="avatar">{user?.username?.[0]?.toUpperCase() || 'A'}</div>
            <span>Bonjour {user?.username}</span>

            <a
              href="/back-office/connexion"
              className="logout-btn"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </a>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
    </div>
  );
}

export default BackOfficeLayout;
