import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBonPlan } from '../lib/bonplan';
import './BonPlan.css';

function BonPlan() {
  const { t, i18n } = useTranslation();
  const [lightbox, setLightbox] = useState(null); // { image, title } | null
  const [zencardOpen, setZencardOpen] = useState(false);

  const galleryItems = [
    { img: '/images/zencard_pub2.jpg', alt: t('bonPlan.gallery.items.pub2.alt'), title: t('bonPlan.gallery.items.pub2.title') },
    { img: '/images/zencard_pub3.jpg', alt: t('bonPlan.gallery.items.pub3.alt'), title: t('bonPlan.gallery.items.pub3.title') },
    { img: '/images/zencard_pub5.jpg', alt: t('bonPlan.gallery.items.pub5.alt'), title: t('bonPlan.gallery.items.pub5.title') },
    { img: '/images/zencard_pub5b.jpg', alt: t('bonPlan.gallery.items.pub5b.alt'), title: t('bonPlan.gallery.items.pub5b.title') },
    { img: '/images/zencard_pub6.jpg', alt: t('bonPlan.gallery.items.pub6.alt'), title: t('bonPlan.gallery.items.pub6.title') },
    { img: '/images/zencard_pub6b.jpg', alt: t('bonPlan.gallery.items.pub6b.alt'), title: t('bonPlan.gallery.items.pub6b.title') },
    { img: '/images/zencard_pub7.jpg', alt: t('bonPlan.gallery.items.pub7.alt'), title: t('bonPlan.gallery.items.pub7.title') },
    { img: '/images/zencard_product.jpg', alt: t('bonPlan.gallery.items.product.alt'), title: t('bonPlan.gallery.items.product.title') },
  ];

  // Contenu local, affiché tant que l'API Bon Plan n'est pas branchée ou ne répond pas.
  const localContent = {
    posters: galleryItems.map((item) => ({ id: item.img, title: item.title, image: item.img, alt: item.alt })),
    cards: [
      {
        id: 'excel-rh',
        title: t('bonPlan.textCard.title'),
        text: t('bonPlan.textCard.text'),
        badge: t('bonPlan.textCard.badge'),
        url: '#',
        linkLabel: t('bonPlan.textCard.link'),
      },
    ],
  };
  const locale = (i18n.resolvedLanguage || i18n.language || 'fr').slice(0, 2);
  // Contenu et mise en page (textes, compteur, bouton, cartes, colonnes) réglés dans l'admin Bon Plan.
  const { posters, cards, page, loading } = useBonPlan(localContent, locale);
  const texts = page.texts;
  const shownCards = page.showCards ? cards : [];

  return (
    <div className="page-bonplan">
      {/* ANNIVERSAIRE */}
      <div className="anniv-banner">
        <div className="container">
          <div className="anniv-inner">
            <div className="anniv-badge">{t('bonPlan.anniv.badge')}</div>

            <div className="anniv-text">
              {t('bonPlan.anniv.textBefore')} <strong>{t('bonPlan.anniv.textStrong')}</strong>{' '}
              {t('bonPlan.anniv.textAfter')}
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-tag">{texts.heroEyebrow || t('bonPlan.hero.tag')}</div>

            <h1 className="hero-title">
              {texts.heroTitle || (
                <>
                  {t('bonPlan.hero.titleLine1')}
                  <span>{t('bonPlan.hero.titleAmp')}</span>
                  {t('bonPlan.hero.titleLine2')}
                </>
              )}
            </h1>

            <p className="hero-text">{texts.heroText || t('bonPlan.hero.text')}</p>

            {page.showZencardButton && (
              <button className="hero-btn" onClick={() => setZencardOpen(true)}>
                {texts.buttonLabel || t('bonPlan.hero.cta')}
              </button>
            )}

            {page.showCounter && (
              <div className="bp-stats">
                <div>
                  <b>{loading ? '–' : posters.length + shownCards.length}</b>
                  <span>{t('bonPlan.stats.offers')}</span>
                </div>
                <i aria-hidden="true" />
                <div>
                  <b className="bp-stats-gold">ZenCard</b>
                  <span>{t('bonPlan.stats.card')}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION */}
        <section className="bonsplans-section">
          <div className="container">
            <div style={{ textAlign: 'center' }}>
              <span className="section-tag">{texts.sectionEyebrow || t('bonPlan.section.tag')}</span>
              <h2 className="section-title">{texts.sectionTitle || t('bonPlan.section.title')}</h2>
            </div>

            <div className={`bp-grid bp-cols-${page.columns}`}>
              {posters.map((item) => (
                <div
                  className="bp-card"
                  key={item.id}
                  onClick={() => setLightbox({ image: item.image, title: item.title })}
                >
                  <span className="bp-badge">{item.badge || t('bonPlan.gallery.badge')}</span>

                  <img src={item.image} className="bp-img" alt={item.alt || item.title} loading="lazy" />

                  <div className="bp-overlay">
                    <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>
                      {t('bonPlan.gallery.enlarge')}
                    </span>
                  </div>

                  <div className="bp-footer">
                    <span className="bp-name">{item.title}</span>
                  </div>
                </div>
              ))}

              {/* CARTES TEXTE */}
              {shownCards.map((card) => (
              <div className="bp-text-card" key={card.id}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'var(--gold-pale)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    marginBottom: '14px',
                  }}
                >
                  💡
                </div>

                <span
                  style={{
                    display: 'inline-block',
                    background: 'var(--gold)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    marginBottom: '12px',
                  }}
                >
                  {card.badge || t('bonPlan.textCard.badge')}
                </span>

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--blue-deep)',
                    marginBottom: '10px',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--gray)',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                  }}
                >
                  {card.text}
                </p>

                {card.url && (
                <a
                  href={card.url}
                  {...(/^https?:/.test(card.url) ? { target: '_blank', rel: 'noreferrer' } : {})}
                  style={{
                    color: 'var(--blue-mid)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '13px',
                  }}
                >
                  {card.linkLabel || t('bonPlan.textCard.link')}
                </a>
                )}
              </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* LIGHTBOX */}
      <div
        id="lb-modal"
        className="lb-bg"
        style={{ display: lightbox ? 'flex' : 'none' }}
        onClick={() => setLightbox(null)}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '640px',
            width: '94%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lb-close" onClick={() => setLightbox(null)}>
            {t('bonPlan.lightbox.close')}
          </button>

          <img id="lb-img" src={lightbox?.image || undefined} alt="" className="lb-img" />

          <div
            id="lb-title"
            style={{ color: 'white', marginTop: '16px', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}
          >
            {lightbox?.title || ''}
          </div>
        </div>
      </div>

      {/* MODAL ZENCARD */}
      <div id="zencard-modal" className="zc-modal-bg" style={{ display: zencardOpen ? 'flex' : 'none' }}>
        <div className="zc-modal-box">
          <button className="zc-close" onClick={() => setZencardOpen(false)}>
            {t('bonPlan.zencardModal.close')}
          </button>

          <div
            style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 22px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg,var(--gold),#c9990f)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}
          >
            💳
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--blue-deep)',
              marginBottom: '10px',
            }}
          >
            {t('bonPlan.zencardModal.title')}
          </h2>

          <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.7 }}>
            {t('bonPlan.zencardModal.text')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BonPlan;
