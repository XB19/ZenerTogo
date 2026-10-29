import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Carte du catalogue, calquée sur zener.tg : visuel, marque, nom, prix et
// lien « Voir le produit » vers la fiche /produits/:slug (l'ajout au panier
// se fait depuis la fiche).
function ProductCard({ product }) {
  const { t } = useTranslation();
  const { slug, name, price, oldPrice, discount, image, brand } = product;
  const url = `/produits/${slug}`;

  return (
    <article className="product-card">
      {discount && <span className="product-discount-badge">{discount}</span>}

      <Link to={url} className="product-card-image" aria-label={name}>
        <img src={image} alt={name} loading="lazy" />
      </Link>

      <div className="product-content">
        <p className="product-brand">{t(`boutique.options.marque.${brand}`)}</p>
        <h3>
          <Link to={url}>{name}</Link>
        </h3>
        <div className="price-row">
          {oldPrice && <span className="old-price">{oldPrice}</span>}
          <span className="price">{price}</span>
        </div>

        <Link to={url} className="product-view-link">
          {t('boutique.card.view')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
