import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { name, price, oldPrice, discount, image } = product;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="product-card">
      {discount && <span className="product-discount-badge">{discount}</span>}

      <img src={image} alt={name} loading="lazy" />

      <div className="product-content">
        <h3>{name}</h3>
        <div className="price-row">
          {oldPrice && <span className="old-price">{oldPrice}</span>}
          <span className="price">{price}</span>
        </div>

        <button
          type="button"
          className={`shop-btn${added ? ' added' : ''}`}
          onClick={handleAdd}
          aria-label={t('cards.addToCartAria', { name })}
        >
          <i className={`fa-solid ${added ? 'fa-check' : 'fa-cart-plus'}`}></i>
          {added ? t('cards.added') : t('cards.addToCart')}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
