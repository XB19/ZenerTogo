import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';
import './AdminLayout.css';

function AdminLayout() {
  const { user, logout } = useAdminAuth();
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
    <div className="admin-app">
    <div className="admin-layout">
      <aside className={`sidebar${sidebarOpen ? ' active' : ''}`} id="adminSidebar">
        <div className="logo">
          <img src="/images/logo.png" alt="ZENER" />
          <span>Administration</span>
        </div>

        <ul className="menu">
          <li>
            <Link to="/admin-panel" onClick={closeSidebar}>
              <i className="fa-solid fa-house"></i>
              Tableau de bord
            </Link>
          </li>

          <li>
            <Link to="/admin-panel/carrieres/offres" onClick={closeSidebar}>
              <i className="fa-solid fa-briefcase"></i>
              Offres d'emploi
            </Link>
          </li>

          <li>
            <Link to="/admin-panel/carrieres/candidatures" onClick={closeSidebar}>
              <i className="fa-solid fa-file-lines"></i>
              Candidatures
            </Link>
          </li>

          <li>
            <a href="#">
              <i className="fa-solid fa-gas-pump"></i>
              Stations
            </a>
          </li>

          <li>
            <Link to="/admin-panel/zencard" onClick={closeSidebar}>
              <i className="fa-solid fa-credit-card"></i>
              ZenCard
            </Link>
          </li>

          <li>
            <Link to="/admin-panel/news" onClick={closeSidebar}>
              <i className="fa-solid fa-newspaper"></i>
              Actualités
            </Link>
          </li>

          <li>
            <Link to="/admin-panel/contact" onClick={closeSidebar}>
              <i className="fa-solid fa-envelope"></i>
              Messages Contact
            </Link>
          </li>

          <li>
            <a href="#">
              <i className="fa-solid fa-gear"></i>
              Paramètres
            </a>
          </li>
        </ul>

        <div className="sidebar-logout">
          <a
            href="/admin/login"
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
        id="adminOverlay"
        onClick={closeSidebar}
      ></div>

      <div className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              type="button"
              className="sidebar-toggle"
              id="sidebarToggle"
              aria-label="Ouvrir le menu"
              aria-controls="adminSidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className="page-title">Tableau de bord</div>
          </div>

          <div className="admin-user">
            <div className="avatar">{user?.username?.[0]?.toUpperCase() || 'A'}</div>
            <span>Bonjour {user?.username}</span>

            <a
              href="/admin/login"
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

export default AdminLayout;
