import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FAQSection from '../components/FAQSection.jsx';
import { faqs } from '../data/faq.js';
import { stations } from '../data/stations.js';
import { pickLang } from '../utils/i18nData.js';
import './ZenCard.css';

const initialForm = { nom: '', telephone: '', email: '', ville: '', type: '', station: '' };

function ZenCard() {
  const { t, i18n } = useTranslation();

  const zencardFaqs = faqs
    .filter((item) => item.category === 'zencard')
    .map((item) => ({
      id: item.id,
      question: pickLang(item.question, i18n.language),
      answer: pickLang(item.answer, i18n.language),
    }));
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: remplacer par un vrai appel API (POST multipart avec la photo
    // de CNI) une fois le backend PostgreSQL branché.
    setSubmitted(true);
    setForm(initialForm);
    e.target.reset();
  };

  return (
    <div className="page-zencard">
      {/* HERO */}
      <section className="zencard-hero">
        <div className="zencard-overlay"></div>

        <div className="container">
          <div className="zencard-content">
            <span className="zencard-badge">{t('zencard.hero.badge')}</span>
            <h1>{t('zencard.hero.title')}</h1>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t('zencard.benefits.heading')}</h2>
          </div>

          <div className="benefits-layout">
            <div className="benefits-image">
              <img src="/images/zencard_pub2.jpg" alt={t('zencard.benefits.imageAlt')} loading="lazy" />
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>{t('zencard.benefits.cards.speed.title')}</h3>
                <p>{t('zencard.benefits.cards.speed.text')}</p>
              </div>
              <div className="benefit-card">
                <h3>{t('zencard.benefits.cards.security.title')}</h3>
                <p>{t('zencard.benefits.cards.security.text')}</p>
              </div>
              <div className="benefit-card">
                <h3>{t('zencard.benefits.cards.tracking.title')}</h3>
                <p>{t('zencard.benefits.cards.tracking.text')}</p>
              </div>
              <div className="benefit-card">
                <h3>{t('zencard.benefits.cards.accepted.title')}</h3>
                <p>{t('zencard.benefits.cards.accepted.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ETAPES */}
      <section className="steps-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t('zencard.steps.heading')}</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>{t('zencard.steps.items.form.title')}</h3>
              <p>{t('zencard.steps.items.form.text')}</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>{t('zencard.steps.items.validation.title')}</h3>
              <p>{t('zencard.steps.items.validation.text')}</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>{t('zencard.steps.items.pickup.title')}</h3>
              <p>{t('zencard.steps.items.pickup.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="form-section" id="top">
        <div className="container">
          <div className="form-wrapper">
            <h2>{t('zencard.form.heading')}</h2>

            {submitted && (
              <p style={{ color: '#4b8f1e', fontWeight: 600, marginBottom: '20px' }}>
                {t('zencard.form.successMessage')}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('zencard.form.labels.fullName')}</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>{t('zencard.form.labels.phone')}</label>
                  <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>{t('zencard.form.labels.email')}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>{t('zencard.form.labels.city')}</label>
                  <input type="text" name="ville" value={form.ville} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>{t('zencard.form.labels.type')}</label>
                  <select name="type" value={form.type} onChange={handleChange} required>
                    <option value="">{t('zencard.form.typeOptions.select')}</option>
                    <option value="Particulier">{t('zencard.form.typeOptions.individual')}</option>
                    <option value="Entreprise">{t('zencard.form.typeOptions.business')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('zencard.form.labels.station')}</label>
                  <select name="station" value={form.station} onChange={handleChange} required>
                    <option value="">{t('zencard.form.stationPlaceholder')}</option>
                    {stations.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} — {s.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full">
                  <label>{t('zencard.form.labels.idPhoto')}</label>
                  <input type="file" name="cni" accept="image/*" required />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                {t('zencard.form.submitCta')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="zencard-faq">
        <div className="container">
          <div className="section-heading">
            <h2>{t('zencard.faq.heading')}</h2>
          </div>

          <div className="zencard-faq-list">
            <FAQSection items={zencardFaqs} />
          </div>

          <div className="zencard-faq-more">
            <Link to="/faq">{t('zencard.faq.moreLink')}</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="zencard-cta">
        <div className="container">
          <h2>{t('zencard.cta.title')}</h2>
          <p>{t('zencard.cta.text')}</p>

          <a href="#top" className="cta-btn">
            {t('zencard.cta.button')}
          </a>
        </div>
      </section>
    </div>
  );
}

export default ZenCard;
