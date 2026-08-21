import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext.jsx';
import { stations } from '../data/stations.js';
import { parsePrice, formatPrice } from '../utils/price.js';
import './Checkout.css';

const initialForm = {
  nom: '',
  telephone: '',
  email: '',
  mode: 'retrait',
  station: stations[0]?.id ?? '',
  adresse: '',
  paiement: 'especes',
};

function Checkout() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { items, totalAmount, clearCart } = useCart();

  const [form, setForm] = useState(initialForm);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: remplacer par un vrai appel API (POST /api/commandes) une fois
    // le backend PostgreSQL branché. Pour l'instant on simule la commande.
    const number = `ZEN-${Date.now().toString().slice(-6)}`;
    setOrderNumber(number);
    setOrderPlaced(true);
    clearCart();

    if (window.confetti) {
      window.confetti({ particleCount: 250, spread: 180, origin: { y: 0.6 } });
    }
  };

  if (orderPlaced) {
    return (
      <div className="page-checkout">
        <section className="checkout-hero">
          <div className="container">
            <span className="checkout-badge">{t('checkout.hero.badge')}</span>
            <h1>{t('checkout.hero.title')}</h1>
          </div>
        </section>

        <section className="checkout-section container">
          <div className="checkout-success">
            <div className="success-icon">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2>{t('checkout.success.title')}</h2>
            <p>{t('checkout.success.text', { orderNumber })}</p>

            <div className="checkout-success-actions">
              <Link to="/" className="checkout-secondary-btn">
                {t('checkout.success.backHome')}
              </Link>
              <Link to="/boutique" className="checkout-primary-btn">
                {t('checkout.success.backShop')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page-checkout">
        <section className="checkout-hero">
          <div className="container">
            <span className="checkout-badge">{t('checkout.hero.badge')}</span>
            <h1>{t('checkout.hero.title')}</h1>
          </div>
        </section>

        <section className="checkout-section container">
          <div className="checkout-empty">
            <i className="fa-solid fa-cart-shopping"></i>
            <p>{t('checkout.empty.text')}</p>
            <Link to="/boutique" className="checkout-primary-btn">
              {t('checkout.empty.cta')}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-checkout">
      <section className="checkout-hero">
        <div className="container">
          <span className="checkout-badge">{t('checkout.hero.badge')}</span>
          <h1>{t('checkout.hero.title')}</h1>
        </div>
      </section>

      <section className="checkout-section container">
        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form-col">
            <div className="checkout-block">
              <h2>{t('checkout.form.contactTitle')}</h2>

              <div className="form-grid">
                <div className="form-group full">
                  <label>{t('checkout.form.fields.name.label')}</label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder={t('checkout.form.fields.name.placeholder')}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t('checkout.form.fields.phone.label')}</label>
                  <input
                    type="text"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder={t('checkout.form.fields.phone.placeholder')}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t('checkout.form.fields.email.label')}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('checkout.form.fields.email.placeholder')}
                  />
                </div>
              </div>
            </div>

            <div className="checkout-block">
              <h2>{t('checkout.form.deliveryTitle')}</h2>

              <div className="checkout-radio-row">
                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="mode"
                    value="retrait"
                    checked={form.mode === 'retrait'}
                    onChange={handleChange}
                  />
                  {t('checkout.form.delivery.pickup')}
                </label>

                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="mode"
                    value="livraison"
                    checked={form.mode === 'livraison'}
                    onChange={handleChange}
                  />
                  {t('checkout.form.delivery.home')}
                </label>
              </div>

              {form.mode === 'retrait' ? (
                <div className="form-group full">
                  <label>{t('checkout.form.stationLabel')}</label>
                  <select name="station" value={form.station} onChange={handleChange} required>
                    <option value="" disabled>
                      {t('checkout.form.stationPlaceholder')}
                    </option>
                    {stations.map((station) => (
                      <option value={station.id} key={station.id}>
                        {station.name} — {station.city}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="form-group full">
                  <label>{t('checkout.form.addressLabel')}</label>
                  <textarea
                    name="adresse"
                    value={form.adresse}
                    onChange={handleChange}
                    placeholder={t('checkout.form.addressPlaceholder')}
                    required
                  ></textarea>
                </div>
              )}
            </div>

            <div className="checkout-block">
              <h2>{t('checkout.form.paymentTitle')}</h2>

              <div className="checkout-radio-row">
                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="paiement"
                    value="especes"
                    checked={form.paiement === 'especes'}
                    onChange={handleChange}
                  />
                  {t('checkout.form.payment.cash')}
                </label>

                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="paiement"
                    value="mobile"
                    checked={form.paiement === 'mobile'}
                    onChange={handleChange}
                  />
                  {t('checkout.form.payment.mobile')}
                </label>
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <h2>{t('checkout.summary.title')}</h2>

            <div className="checkout-summary-items">
              {items.map((item) => (
                <div className="checkout-summary-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-summary-item-info">
                    <span className="name">{item.name}</span>
                    <span className="qty">× {item.quantity}</span>
                  </div>
                  <span className="line-total">
                    {formatPrice(parsePrice(item.price) * item.quantity, lang)}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-summary-total">
              <span>{t('checkout.summary.total')}</span>
              <span>{formatPrice(totalAmount, lang)}</span>
            </div>

            <button type="submit" className="checkout-primary-btn checkout-submit">
              <i className="fa-solid fa-circle-check"></i>
              {t('checkout.form.submitCta')}
            </button>
          </aside>
        </form>
      </section>
    </div>
  );
}

export default Checkout;
