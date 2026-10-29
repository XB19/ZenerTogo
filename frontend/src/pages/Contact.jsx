import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { boutiqueProducts } from '../data/mockData.js';
import './Contact.css';

const initialForm = { nom: '', email: '', telephone: '', sujet: '', message: '' };

function Contact() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const requestedProduct = boutiqueProducts.find((p) => p.slug === searchParams.get('produit'));
  const [form, setForm] = useState(() =>
    requestedProduct
      ? { ...initialForm, sujet: t('boutique.detail.requestSubject', { name: requestedProduct.name }) }
      : initialForm
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: remplacer par un vrai appel API (POST /api/contact) une fois
    // le backend PostgreSQL branché. Pour l'instant on simule l'envoi.
    setSubmitted(true);
    setForm(initialForm);

    if (window.confetti) {
      window.confetti({ particleCount: 250, spread: 180, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="page-contact">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-overlay"></div>

        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-badge">{t('contact.hero.badge')}</span>
            <h1>{t('contact.hero.title')}</h1>
            <p>{t('contact.hero.description')}</p>
          </div>
        </div>
      </section>

      {/* INFOS */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-header">
            <h2>{t('contact.info.header.title')}</h2>
            <p>{t('contact.info.header.text')}</p>
          </div>

          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h3>{t('contact.info.address.title')}</h3>
              <p>
                {t('contact.info.address.line1')}
                <br />
                {t('contact.info.address.line2')}
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <h3>{t('contact.info.phone.title')}</h3>
              <p>{t('contact.info.phone.value')}</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <h3>{t('contact.info.email.title')}</h3>
              <p>{t('contact.info.email.value')}</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>{t('contact.info.hours.title')}</h3>
              <p>
                {t('contact.info.hours.days')}
                <br />
                {t('contact.info.hours.time')}
              </p>
            </div>
          </div>

          {/* FORMULAIRE */}
          <section className="contact-form-section">
            <div className="container">
              <div className="contact-form-wrapper">
                <div className="contact-form-header">
                  <h2>{t('contact.form.header.title')}</h2>
                  <p>{t('contact.form.header.text')}</p>
                </div>

                {submitted && (
                  <div className="success-alert">
                    <div className="success-icon">
                      <i className="fa-solid fa-check"></i>
                    </div>

                    <div>
                      <h4>{t('contact.form.success.title')}</h4>
                      <p>{t('contact.form.success.text')}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>{t('contact.form.fields.name.label')}</label>
                      <input
                        type="text"
                        name="nom"
                        placeholder={t('contact.form.fields.name.placeholder')}
                        value={form.nom}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>{t('contact.form.fields.email.label')}</label>
                      <input
                        type="email"
                        name="email"
                        placeholder={t('contact.form.fields.email.placeholder')}
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>{t('contact.form.fields.phone.label')}</label>
                      <input
                        type="text"
                        name="telephone"
                        placeholder={t('contact.form.fields.phone.placeholder')}
                        value={form.telephone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t('contact.form.fields.subject.label')}</label>
                      <input
                        type="text"
                        name="sujet"
                        placeholder={t('contact.form.fields.subject.placeholder')}
                        value={form.sujet}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group full">
                      <label>{t('contact.form.fields.message.label')}</label>
                      <textarea
                        name="message"
                        placeholder={t('contact.form.fields.message.placeholder')}
                        value={form.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="contact-btn">
                    <i className="fa-solid fa-paper-plane"></i>
                    {t('contact.form.submitCta')}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* CARTE */}
          <section className="map-section">
            <div className="container">
              <h2>{t('contact.map.title')}</h2>
              <div className="map-box">
                <iframe
                  title={t('contact.map.title')}
                  src="https://www.google.com/maps?q=Zone+industrielle+de+Lom%C3%A9,+route+d%27An%C3%A9ho,+Lom%C3%A9,+Togo&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Contact;
