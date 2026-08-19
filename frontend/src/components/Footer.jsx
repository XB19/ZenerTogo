import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="zener-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/images/logo.png" alt="ZENER" />

              <h3>
                <strong>L'énergie</strong> qui accompagne le
                <br />
                <strong>développement</strong> du <strong>Togo</strong>
              </h3>
            </div>

            <div className="footer-column">
              <h4>Liens rapides</h4>
              <ul>
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to="/a-propos">À propos</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/actualites">Actualités</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Nos services</h4>
              <ul>
                <li>
                  <a href="#">Carburants</a>
                </li>
                <li>
                  <a href="#">Gaz</a>
                </li>
                <li>
                  <a href="#">Lubrifiants</a>
                </li>
                <li>
                  <a href="#">Stations-services</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="#">Téléphone</a>
                </li>
                <li>
                  <a href="#">Email</a>
                </li>
                <li>
                  <a href="#">Adresse</a>
                </li>
                <li>
                  <a href="#">Réseaux sociaux</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-socials">
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>

          <div className="footer-copyright">COPYRIGHT © ZENER 2026</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
