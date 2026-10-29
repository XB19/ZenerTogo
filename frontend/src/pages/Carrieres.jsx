import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { offres } from '../data/mockData.js';
import { dateLocale, pickLang } from '../utils/i18nData.js';
import './Carrieres.css';

const initialForm = { nom: '', email: '', telephone: '', poste: '', message: '' };

function Carrieres() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: remplacer par un vrai appel API (POST multipart avec le CV et
    // la lettre de motivation) une fois le backend PostgreSQL branché.
    setSubmitted(true);
    setForm(initialForm);
    e.target.reset();
  };

  return (
    <div className="page-carrieres">
      {submitted && (
        <div className="success-message">{t('careers.successMessage')}</div>
      )}

      {/* HERO */}
      <section className="career-hero">
        <div className="career-overlay"></div>

        <div className="container">
          <div className="career-content">
            <span className="career-badge">{t('careers.hero.badge')}</span>
            <h1>{t('careers.hero.title')}</h1>
            <p>{t('careers.hero.text')}</p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="career-intro">
        <div className="container">
          <div className="career-grid">
            <div className="career-image">
              <img src="/images/career-team.png" alt="" />
            </div>

            <div className="career-text">
              <h2>{t('careers.intro.title')}</h2>
              <p>{t('careers.intro.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="hr-values">
        <div className="container">
          <div className="section-title">
            <h2>{t('careers.values.sectionTitle')}</h2>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <h3>{t('careers.values.training.title')}</h3>
              <p>{t('careers.values.training.text')}</p>
            </div>
            <div className="value-card">
              <h3>{t('careers.values.innovation.title')}</h3>
              <p>{t('careers.values.innovation.text')}</p>
            </div>
            <div className="value-card">
              <h3>{t('careers.values.growth.title')}</h3>
              <p>{t('careers.values.growth.text')}</p>
            </div>
            <div className="value-card">
              <h3>{t('careers.values.wellbeing.title')}</h3>
              <p>{t('careers.values.wellbeing.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="career-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-box">
              <span>350+</span>
              {t('careers.stats.partners')}
            </div>
            <div className="stat-box">
              <span>25+</span>
              {t('careers.stats.stations')}
            </div>
            <div className="stat-box">
              <span>15+</span>
              {t('careers.stats.experience')}
            </div>
            <div className="stat-box">
              <span>100%</span>
              {t('careers.stats.commitment')}
            </div>
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section className="jobs-section">
        <div className="container">
          <div className="section-title">
            <h2>{t('careers.jobs.sectionTitle')}</h2>
          </div>

          <div className="jobs-list">
            {offres.length === 0 ? (
              <div className="no-job">
                <i className="ri-briefcase-line"></i>
                <h3>{t('careers.jobs.emptyTitle')}</h3>
                <p>{t('careers.jobs.emptyText')}</p>
              </div>
            ) : (
              offres.map((offre) => (
                <div className="job-card" key={offre.id}>
                  <div className="job-info">
                    <h3>{pickLang(offre.titre, lang)}</h3>

                    <p>
                      <strong>{offre.ville}</strong> • {pickLang(offre.type_contrat, lang)}
                      {offre.departement && <> • {pickLang(offre.departement, lang)}</>}
                    </p>

                    {offre.date_limite && (
                      <div className="job-date">
                        {t('careers.jobs.deadline')} :{' '}
                        {new Date(offre.date_limite).toLocaleDateString(dateLocale(lang))}
                      </div>
                    )}
                  </div>

                  <Link to={`/carrieres/offre/${offre.id}`} className="job-btn">
                    {t('careers.jobs.apply')}
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CANDIDATURE SPONTANÉE */}
      <section className="application-section">
        <div className="container">
          <div className="application-box">
            <h2>{t('careers.application.title')}</h2>
            <p>{t('careers.application.text')}</p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <input
                    type="text"
                    name="nom"
                    placeholder={t('careers.application.namePlaceholder')}
                    value={form.nom}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder={t('careers.application.emailPlaceholder')}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="telephone"
                    placeholder={t('careers.application.phonePlaceholder')}
                    value={form.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="poste"
                    placeholder={t('careers.application.positionPlaceholder')}
                    value={form.poste}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="file-label">{t('careers.application.cvLabel')}</label>
                  <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
                </div>

                <div className="form-group">
                  <label className="file-label">{t('careers.application.coverLetterLabel')}</label>
                  <input type="file" name="lettre_motivation" accept=".pdf,.doc,.docx" />
                </div>

                <div className="form-group full">
                  <textarea
                    name="message"
                    placeholder={t('careers.application.messagePlaceholder')}
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                {t('careers.application.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="career-cta">
        <div className="container">
          <h2>{t('careers.cta.title')}</h2>
          <p>{t('careers.cta.text')}</p>

          <Link to="/contact" className="cta-btn">
            {t('careers.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Carrieres;
