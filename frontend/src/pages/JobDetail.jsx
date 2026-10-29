import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { offres } from '../data/mockData.js';
import { dateLocale, pickLang } from '../utils/i18nData.js';
import './JobDetail.css';

const initialForm = { nom: '', email: '', telephone: '' };

function JobDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const offre = offres.find((o) => String(o.id) === id);

  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: remplacer par un vrai appel API (POST multipart avec le CV et
    // la lettre de motivation) une fois le backend PostgreSQL branché.
    setSuccess(true);
    setForm(initialForm);
    e.target.reset();
  };

  if (!offre) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h1>{t('careers.jobDetail.notFound.title')}</h1>
        <p>
          {t('careers.jobDetail.notFound.text')}{' '}
          <Link to="/carrieres">{t('careers.jobDetail.notFound.backLink')}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page-jobdetail">
      {success && (
        <div id="success-popup">
          <div className="success-card">
            <div className="success-icon">🎉</div>
            <h2>{t('careers.jobDetail.success.title')}</h2>
            <p>{t('careers.jobDetail.success.text')}</p>
            <button onClick={() => setSuccess(false)}>{t('careers.jobDetail.success.close')}</button>
          </div>
        </div>
      )}

      <section className="job-hero">
        <div className="container">
          <h1>{pickLang(offre.titre, lang)}</h1>

          <p>{t('careers.jobDetail.hero.tagline')}</p>

          <div className="job-meta">
            <span>📍 {offre.ville}</span>
            <span>{pickLang(offre.type_contrat, lang)}</span>
            <span>{pickLang(offre.departement, lang)}</span>
          </div>
        </div>
      </section>

      <section className="job-wrapper">
        <div className="container">
          <Link to="/carrieres" className="back-link">
            ← {t('careers.jobDetail.backLink')}
          </Link>

          <div className="job-layout">
            <div className="job-card">
              <div className="section-job">
                <h2>{t('careers.jobDetail.sections.description')}</h2>
                {pickLang(offre.description, lang).split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="section-job">
                <h2>{t('careers.jobDetail.sections.missions')}</h2>
                {pickLang(offre.missions, lang).split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="section-job">
                <h2>{t('careers.jobDetail.sections.profile')}</h2>
                {pickLang(offre.profil, lang).split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <div className="info-item">
                <span className="info-label">{t('careers.jobDetail.sidebar.location')}</span>
                {offre.ville}
              </div>

              <div className="info-item">
                <span className="info-label">{t('careers.jobDetail.sidebar.contract')}</span>
                {pickLang(offre.type_contrat, lang)}
              </div>

              <div className="info-item">
                <span className="info-label">{t('careers.jobDetail.sidebar.department')}</span>
                {pickLang(offre.departement, lang)}
              </div>

              <div className="info-item">
                <span className="info-label">{t('careers.jobDetail.sidebar.publishedDate')}</span>
                {new Date(offre.created_at).toLocaleDateString(dateLocale(lang))}
              </div>

              <div className="info-item">
                <span className="status-active">{t('careers.jobDetail.sidebar.active')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="apply-section">
        <div className="container">
          <div className="form-container">
            <h2 className="form-title">{t('careers.jobDetail.apply.title')}</h2>
            <p className="form-subtitle">{t('careers.jobDetail.apply.subtitle')}</p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('careers.jobDetail.apply.nameLabel')}</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>{t('careers.jobDetail.apply.emailLabel')}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>{t('careers.jobDetail.apply.phoneLabel')}</label>
                  <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>{t('careers.jobDetail.apply.cvLabel')}</label>
                  <input type="file" name="cv" required />
                </div>

                <div className="form-group full">
                  <label>{t('careers.jobDetail.apply.motivationLabel')}</label>
                  <textarea
                    name="message"
                    placeholder={t('careers.jobDetail.apply.messagePlaceholder')}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                {t('careers.jobDetail.apply.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JobDetail;
