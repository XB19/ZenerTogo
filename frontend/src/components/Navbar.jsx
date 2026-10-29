import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchOverlay from './SearchOverlay.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useCart } from '../context/CartContext.jsx';
import './Navbar.css';

function Navbar() {
  const { t } = useTranslation();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef(null);
  const location = useLocation();

  const NAV_LINKS = [
    { to: '/', label: t('nav.home'), match: '/' },
    { to: '/a-propos', label: t('nav.about'), match: '/a-propos' },
    { to: '/services', label: t('nav.services'), match: '/services' },
    { to: '/stations', label: t('nav.stations'), match: '/stations' },
    { to: '/zencard', label: t('nav.zencard'), match: '/zencard' },
    { to: '/actualites', label: t('nav.news'), match: '/actualites' },
    { to: '/faq', label: t('nav.faq'), match: '/faq' },
    { to: '/carrieres', label: t('nav.careers'), match: '/carrieres' },
    { to: '/bon_plan', label: t('nav.bonPlan'), match: '/bon_plan' },
  ];

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

          <Link to="/contact" className="nav-menu-cta" onClick={closeMenu}>
            {t('nav.contactCta')}
          </Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="cart-btn"
            aria-label={t('nav.search')}
            title={t('nav.search')}
            ref={searchTriggerRef}
            onClick={() => setSearchOpen(true)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <Link to="/portail-client/connexion" className="cart-btn" aria-label={t('nav.clientSpace')} title={t('nav.clientSpace')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"></path>
              <path d="M4 20.5c1.5-3.6 4.8-5.5 8-5.5s6.5 1.9 8 5.5"></path>
            </svg>
          </Link>

          <Link to="/panier" className="cart-btn" aria-label={t('nav.cart')} title={t('nav.cart')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6V20H21V6L18 2H6Z"></path>
              <path d="M3 6H21"></path>
              <path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10"></path>
            </svg>
            <span className="cart-count">{totalItems}</span>
          </Link>

          <Link to="/contact" className="nav-contact-btn">
            {t('nav.contactCta')}
          </Link>

          <LanguageSwitcher />

          <button
            type="button"
            className={`burger${menuOpen ? ' active' : ''}`}
            id="navBurger"
            aria-label={t('nav.openMenu')}
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} triggerRef={searchTriggerRef} />
    </header>
  );
}

export default Navbar;
