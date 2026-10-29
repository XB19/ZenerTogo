import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShareButtons from '../components/ShareButtons.jsx';
import { actualites } from '../data/mockData.js';
import { dateLocale, pickLang } from '../utils/i18nData.js';
import './NewsDetail.css';

const FALLBACK_IMAGE = '/images/station-banner.png';

function NewsDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const actualite = actualites.find((a) => String(a.id) === id);

  if (!actualite) {
    return (
      <div className="page-newsdetail news-container">
        <h1>{t('news.notFound.title')}</h1>
        <p>
          <Link to="/actualites">{t('news.notFound.back')}</Link>
        </p>
      </div>
    );
  }

  const titre = pickLang(actualite.titre, lang);
  const categorie = pickLang(actualite.categorie, lang);
  const contenu = pickLang(actualite.contenu, lang);
  const plainText = contenu.replace(/^## /gm, '');

  const pageUrl = `${window.location.origin}/news/${actualite.id}`;
  const image = actualite.image || FALLBACK_IMAGE;
  const excerpt = plainText.slice(0, 160);

  return (
    <div className="page-newsdetail news-container">
      <Helmet>
        <title>{titre} — ZENER</title>
        <meta name="description" content={excerpt} />

        <meta property="og:title" content={titre} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={`${window.location.origin}${image}`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titre} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={`${window.location.origin}${image}`} />
      </Helmet>

      <div className="badge">{categorie}</div>

      <div className="news-hero">
        <img
          src={image}
          alt={titre}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className="news-hero-overlay"></div>

        <div className="news-hero-text">
          <h1>{titre}</h1>

          <div className="news-meta">
            <span>
              📅{' '}
              {new Date(actualite.created_at).toLocaleDateString(dateLocale(lang), {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span>• {t('news.detail.author')}</span>
          </div>
        </div>
      </div>

      <div className="news-body">
        {contenu.split('\n').map((line, i) =>
          line.startsWith('## ') ? <h2 key={i}>{line.slice(3)}</h2> : <p key={i}>{line}</p>
        )}
      </div>

      {actualite.gallery?.length > 0 && (
        <div className="news-gallery">
          {actualite.gallery.map((src) => (
            <img key={src} src={src} alt={titre} loading="lazy" />
          ))}
        </div>
      )}

      <div className="back-area">
        <Link to="/actualites" className="back-btn">
          {t('news.detail.back')}
        </Link>

        <ShareButtons url={pageUrl} title={titre} />
      </div>
    </div>
  );
}

export default NewsDetail;
