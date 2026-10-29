import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext.jsx';
import { boutiqueProducts } from '../data/mockData.js';
import { pickLang } from '../utils/i18nData.js';
import './ProductDetail.css';

// Fiche produit /produits/:slug, même contenu et mêmes liens que
// zener.tg/produits/<slug> : fil d'Ariane, visuel, marque + type, nom,
// accroche, prix, « Demander une information » (→ /devis), « Voir mon
// panier », « Parler à un conseiller », puis la description. On y ajoute
// « Ajouter au panier » pour alimenter le panier et la commande du site.
function ProductDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { slug } = useParams();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const product = boutiqueProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="page-product">
        <section className="product-notfound">
          <div className="container">
            <h1>{t('boutique.detail.notFoundTitle')}</h1>
            <p>{t('boutique.detail.notFoundText')}</p>
            <Link to="/produits" className="product-primary-btn">
              {t('boutique.detail.backToCatalog')}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const description = pickLang(product.description, lang);
  const brand = t(`boutique.options.marque.${product.brand}`);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="page-product">
      <Helmet>
        <title>{product.name} — ZENER</title>
        <meta name="description" content={description} />
      </Helmet>

      <section className="product-main">
        <div className="container">
          <nav className="product-breadcrumb" aria-label={t('a11y.breadcrumb')}>
            <Link to="/">{t('boutique.breadcrumb.home')}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/produits">{t('boutique.breadcrumb.products')}</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-grid">
            <div className="product-visual">
              <img src={product.image} alt={product.name} width="400" height="400" />
            </div>

            <div className="product-info">
              <div className="product-tags">
                <span className="product-tag product-tag-brand">{brand}</span>
                <span className="product-tag">{t(`boutique.options.type.${product.type}`)}</span>
              </div>

              <h1>{product.name}</h1>
              <p className="product-lead">{description}</p>
              <p className="product-price">{product.price}</p>

              <div className="product-buttons">
                <Link to={`/devis?produit=${product.slug}`} className="product-primary-btn">
                  {t('boutique.detail.requestInfo')}
                </Link>
                <button
                  type="button"
                  className={`product-cart-btn${added ? ' added' : ''}`}
                  onClick={handleAdd}
                >
                  <i className={`fa-solid ${added ? 'fa-check' : 'fa-cart-plus'}`}></i>
                  {added ? t('boutique.detail.added') : t('boutique.detail.addToCart')}
                </button>
              </div>

              <div className="product-links">
                <Link to="/panier">
                  {t('boutique.detail.viewCart')} <span aria-hidden="true">→</span>
                </Link>
                <Link to="/contact">
                  {t('boutique.detail.advisor')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-about">
        <div className="container">
          <div className="product-about-card">
            <p className="product-eyebrow">{t('boutique.detail.aboutEyebrow')}</p>
            <h2>{t('boutique.detail.descriptionTitle')}</h2>
            <p>{description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
