import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { actualites } from '../data/mockData.js';
import { pickLang } from '../utils/i18nData.js';
import './Actualites.css';

const FALLBACK_IMAGE = '/images/station-banner.png';
const ALL_KEY = 'Tout';

function truncateWords(text, count) {
  const words = text.trim().split(/\s+/);
  if (words.length <= count) return text;
  return words.slice(0, count).join(' ') + '…';
}

function Actualites() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('categorie') || ALL_KEY;

  // Categories are keyed on the French label (stable across language switches)
  // but displayed via pickLang so the filter pills follow the current language.
  const categories = useMemo(() => {
    const seen = new Map();
    actualites.forEach((a) => {
      if (!seen.has(a.categorie.fr)) seen.set(a.categorie.fr, a.categorie);
    });
    return [ALL_KEY, ...seen.values()];
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === ALL_KEY
        ? actualites
        : actualites.filter((a) => a.categorie.fr === activeCategory),
    [activeCategory]
  );

  const setCategory = (catKey) => {
    if (catKey === ALL_KEY) {
      setSearchParams({});
    } else {
      setSearchParams({ categorie: catKey });
    }
  };

  return (
    <div className="page-actualites">
      {/* HERO */}
      <section className="news-hero">
        <div className="news-overlay"></div>

        <div className="container">
          <div className="news-hero-content">
            <span className="news-badge">{t('news.hero.badge')}</span>
            <h1>{t('news.hero.title')}</h1>
            <p>{t('news.hero.text')}</p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="news-intro">
        <div className="container">
          <div className="news-intro-content">
            <span className="section-subtitle">{t('news.intro.subtitle')}</span>
            <h2>{t('news.intro.title')}</h2>
            <p>{t('news.intro.text')}</p>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="news-section">
        <div className="container">
          <div className="news-filters" role="group" aria-label={t('news.filters.ariaLabel')}>
            {categories.map((cat) => {
              const catKey = cat === ALL_KEY ? ALL_KEY : cat.fr;
              const label = cat === ALL_KEY ? t('news.filters.all') : pickLang(cat, lang);
              return (
                <button
                  type="button"
                  key={catKey}
                  className={`news-filter${activeCategory === catKey ? ' active' : ''}`}
                  onClick={() => setCategory(catKey)}
                  aria-pressed={activeCategory === catKey}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="news-grid">
            {filtered.length === 0 ? (
              <p className="news-empty">{t('news.empty')}</p>
            ) : (
              filtered.map((act) => {
                const titre = pickLang(act.titre, lang);
                const contenu = pickLang(act.contenu, lang).replace(/^## /gm, '');
                return (
                  <article className="news-card" key={act.id}>
                    <Link to={`/news/${act.id}`} className="news-image-link">
                      <img
                        src={act.image || FALLBACK_IMAGE}
                        alt={titre}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                    </Link>

                    <div className="news-content">
                      <div className="news-meta">
                        <span className="news-category-badge">{pickLang(act.categorie, lang)}</span>
                        {' • '}
                        {new Date(act.created_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>

                      <h3>
                        <Link to={`/news/${act.id}`}>{titre}</Link>
                      </h3>
                      <p>{truncateWords(contenu, 25)}</p>

                      <Link to={`/news/${act.id}`} className="news-btn">
                        {t('news.readMore')}
                      </Link>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="news-cta">
        <div className="container">
          <h2>{t('news.cta.title')}</h2>
          <p>{t('news.cta.text')}</p>

          <Link to="/contact" className="cta-btn">
            {t('news.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Actualites;
