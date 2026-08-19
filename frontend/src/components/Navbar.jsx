import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Accueil', match: '/' },
  { to: '/a-propos', label: 'À propos', match: '/a-propos' },
  { to: '/services', label: 'Services', match: '/services' },
  { to: '/actualites', label: 'Actualités', match: '/actualites' },
  { to: '/carrieres', label: 'carrieres', match: '/carrieres' },
  { to: '/bon_plan', label: 'Bon plan', match: '/bon_plan' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 991) {
        closeMenu();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isActive = (match) => location.pathname === match;

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="ZENER" />
        </Link>

        <nav className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={isActive(link.match) ? 'active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/boutique" className="cart-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6V20H21V6L18 2H6Z"></path>
              <path d="M3 6H21"></path>
              <path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10"></path>
            </svg>
            <span className="cart-count">0</span>
          </Link>

          <Link to="/contact" className="nav-contact-btn">
            Nous contacter
          </Link>

          <button
            type="button"
            className={`burger${menuOpen ? ' active' : ''}`}
            id="navBurger"
            aria-label="Ouvrir le menu"
            aria-controls="navMenu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div
        className={`nav-overlay${menuOpen ? ' active' : ''}`}
        id="navOverlay"
        onClick={closeMenu}
      ></div>
    </header>
  );
}

export default Navbar;
