import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsletterForm from './NewsletterForm.jsx';

const SOCIAL_LINKS = [
  { icon: 'fa-facebook-f', href: 'https://www.facebook.com/zenertg?_rdc=1&_rdr', label: 'Facebook' },
  { icon: 'fa-x-twitter', href: 'https://x.com/Zenertg', label: 'X (Twitter)' },
  { icon: 'fa-instagram', href: 'https://www.instagram.com/zenertg/', label: 'Instagram' },
  { icon: 'fa-linkedin-in', href: '#', label: 'LinkedIn' },
  { icon: 'fa-tiktok', href: '#', label: 'TikTok' },
];

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="zener-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/images/logo.png" alt="ZENER" />

              <h3>{t('footer.tagline')}</h3>

              <NewsletterForm />
            </div>

            <div className="footer-column">
              <h4>{t('footer.quickLinks')}</h4>
              <ul>
                <li>
                  <Link to="/">{t('nav.home')}</Link>
                </li>
                <li>
                  <Link to="/a-propos">{t('nav.about')}</Link>
                </li>
                <li>
                  <Link to="/services">{t('nav.services')}</Link>
                </li>
                <li>
                  <Link to="/actualites">{t('nav.news')}</Link>
                </li>
                <li>
                  <Link to="/faq">{t('nav.faq')}</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>{t('footer.ourServices')}</h4>
              <ul>
                <li>
                  <Link to="/services">{t('footer.fuels')}</Link>
                </li>
                <li>
                  <Link to="/produits?type=gaz">{t('footer.gas')}</Link>
                </li>
                <li>
                  <Link to="/services">{t('footer.lubricants')}</Link>
                </li>
                <li>
                  <Link to="/stations">{t('footer.gasStations')}</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>{t('footer.spaces')}</h4>
              <ul>
                <li>
                  <Link to="/portail-client/connexion">{t('footer.clientPortal')}</Link>
                </li>
                <li>
                  <Link to="/back-office/connexion">{t('footer.customerCare')}</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>{t('footer.contact')}</h4>
              <ul>
                <li>
                  <a href="tel:+22822272000">{t('footer.phone')}</a>
                </li>
                <li>
                  <a href="mailto:info@zener.tg">{t('footer.email')}</a>
                </li>
                <li>
                  <Link to="/contact">{t('footer.address')}</Link>
                </li>
                <li>
                  <a href="https://www.facebook.com/zenertg" target="_blank" rel="noopener noreferrer">{t('footer.socialNetworks')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-policies-row">
            <Link to="/a-propos#politique-rse">{t('footer.qhse')}</Link>
            <span className="footer-policies-sep">|</span>
            <Link to="/a-propos#politique-rse">{t('footer.rse')}</Link>
            <span className="footer-policies-sep">|</span>
            <span className="footer-locations">
              <i className="fa-solid fa-location-dot"></i> {t('footer.locations')}
            </span>
          </div>

          <div className="footer-join-row">
            <span className="footer-join-label">{t('footer.joinUs')}</span>

            <div className="footer-socials">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <i className={`fa-brands ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-legal-row">
            <div className="footer-copyright">{t('footer.copyright')}</div>
            <Link to="/confidentialite" className="footer-privacy-link">
              {t('footer.privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
