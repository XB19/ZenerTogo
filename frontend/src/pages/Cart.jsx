import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext.jsx';
import { parsePrice, formatPrice } from '../utils/price.js';
import './Cart.css';

function Cart() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { items, updateQuantity, removeItem, totalItems, totalAmount } = useCart();

  return (
    <div className="page-cart">
      <section className="cart-hero">
        <div className="container">
          <span className="cart-badge">{t('cart.hero.badge')}</span>
          <h1>{t('cart.hero.title')}</h1>
        </div>
      </section>

      <section className="cart-section container">
        {items.length === 0 ? (
          <div className="cart-empty">
            <i className="fa-solid fa-cart-shopping"></i>
            <p>{t('cart.empty.text')}</p>
            <Link to="/boutique" className="cart-empty-cta">
              {t('cart.empty.cta')}
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span className="cart-item-price">{item.price}</span>
                  </div>

                  <div className="cart-item-qty">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={t('cart.items.decrease')}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={t('cart.items.increase')}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    {formatPrice(parsePrice(item.price) * item.quantity, lang)}
                  </div>

                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={t('cart.items.remove')}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>{t('cart.summary.title')}</h2>

              <div className="cart-summary-row">
                <span>{t('cart.summary.itemsCount', { count: totalItems })}</span>
                <span>{formatPrice(totalAmount, lang)}</span>
              </div>

              <div className="cart-summary-total">
                <span>{t('cart.summary.total')}</span>
                <span>{formatPrice(totalAmount, lang)}</span>
              </div>

              <Link to="/commande" className="cart-checkout-btn">
                {t('cart.summary.checkout')}
                <i className="fa-solid fa-arrow-right"></i>
              </Link>

              <Link to="/boutique" className="cart-continue-link">
                {t('cart.summary.continue')}
              </Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
