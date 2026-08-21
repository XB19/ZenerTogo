import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './BonPlan.css';

function BonPlan() {
  const { t } = useTranslation();
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
            <div className="hero-tag">{t('bonPlan.hero.tag')}</div>

            <h1 className="hero-title">
              {t('bonPlan.hero.titleLine1')}
              <span>{t('bonPlan.hero.titleAmp')}</span>
              {t('bonPlan.hero.titleLine2')}
            </h1>

            <p className="hero-text">{t('bonPlan.hero.text')}</p>

            <button className="hero-btn" onClick={() => setZencardOpen(true)}>
              {t('bonPlan.hero.cta')}
            </button>
          </div>
        </section>

        {/* SECTION */}
        <section className="bonsplans-section">
          <div className="container">
            <div style={{ textAlign: 'center' }}>
              <span className="section-tag">{t('bonPlan.section.tag')}</span>
              <h2 className="section-title">{t('bonPlan.section.title')}</h2>
            </div>

            <div className="bp-grid">
              {galleryItems.map((item) => (
                <div
                  className="bp-card"
                  key={item.img}
                  onClick={() => setLightbox({ image: item.img, title: item.title })}
                >
                  <span className="bp-badge">{t('bonPlan.gallery.badge')}</span>

                  <img src={item.img} className="bp-img" alt={item.alt} />

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

              {/* CARD TEXTE */}
              <div className="bp-text-card">
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
                  {t('bonPlan.textCard.badge')}
                </span>

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--blue-deep)',
                    marginBottom: '10px',
                  }}
                >
                  {t('bonPlan.textCard.title')}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--gray)',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                  }}
                >
                  {t('bonPlan.textCard.text')}
                </p>

                <a
                  href="#"
                  style={{
                    color: 'var(--blue-mid)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '13px',
                  }}
                >
                  {t('bonPlan.textCard.link')}
                </a>
              </div>
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
