import { Link } from 'react-router-dom';
import { boutiqueProducts } from '../data/mockData.js';
import './Boutique.css';

const categories = ['Lubrifiants', 'Gaz domestique', 'Accessoires', 'Équipements'];

function Boutique() {
  return (
    <div className="page-boutique">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-overlay"></div>

        <div className="container">
          <div className="shop-hero-content">
            <span className="shop-badge">BOUTIQUE ZENER</span>
            <h1>Découvrez notre espace boutique</h1>
            <p>
              Retrouvez une sélection de produits, équipements et accessoires proposés
              par ZENER.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="shop-intro">
        <div className="container">
          <h2>Une boutique pensée pour vous</h2>
          <p>
            Notre boutique vous permet d'accéder rapidement à nos produits et services
            avec la qualité et la fiabilité qui caractérisent ZENER.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="shop-categories">
        <div className="container">
          <div className="category-grid">
            {categories.map((cat) => (
              <div className="category-card" key={cat}>
                <h3>{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUITS */}
      <section className="featured-products">
        <div className="container">
          <div className="section-title">
            <h2>Produits vedettes</h2>
          </div>

          <div className="products-grid">
            {boutiqueProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt="" />

                <div className="product-content">
                  <h3>{product.name}</h3>
                  <div className="price">{product.price}</div>

                  <a href="#" className="shop-btn">
                    Voir le produit
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="shop-cta">
        <div className="container">
          <h2>Besoin d'informations ?</h2>
          <p>Nos équipes sont à votre disposition pour vous conseiller.</p>

          <Link to="/contact" className="cta-btn">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Boutique;
