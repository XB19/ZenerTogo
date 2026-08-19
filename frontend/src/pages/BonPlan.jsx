import { useState } from 'react';
import './BonPlan.css';

const galleryItems = [
  { img: '/images/zencard_pub2.jpg', alt: 'ZenCard Pub 2', title: 'ZenCard — Offre Spéciale' },
  { img: '/images/zencard_pub3.jpg', alt: 'ZenCard Pub 3', title: 'ZenCard — Promotion Exclusive' },
  { img: '/images/zencard_pub5.jpg', alt: 'ZenCard Pub 5', title: 'ZenCard — Bon Plan #5' },
  { img: '/images/zencard_pub5b.jpg', alt: 'ZenCard Pub 5B', title: 'ZenCard — Édition Spéciale' },
  { img: '/images/zencard_pub6.jpg', alt: 'ZenCard Pub 6', title: 'ZenCard — Bon Plan #6' },
  { img: '/images/zencard_pub6b.jpg', alt: 'ZenCard Pub 6B', title: 'ZenCard — Offre Limitée' },
  { img: '/images/zencard_pub7.jpg', alt: 'ZenCard Pub 7', title: 'ZenCard — Bon Plan #7' },
  { img: '/images/zencard_product.jpg', alt: 'ZenCard Produit', title: 'ZenCard — Le Produit' },
];

function BonPlan() {
  const [lightbox, setLightbox] = useState(null); // { image, title } | null
  const [zencardOpen, setZencardOpen] = useState(false);

  return (
    <div className="page-bonplan">
      {/* ANNIVERSAIRE */}
      <div className="anniv-banner">
        <div className="container">
          <div className="anniv-inner">
            <div className="anniv-badge">20 ANS</div>

            <div className="anniv-text">
              Kapi Consult célèbre ses <strong>20 ans d'excellence</strong> au service
              des organisations.
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-tag">Kapi Consult</div>

            <h1 className="hero-title">
              Bons Plans
              <span>&</span>
              ZenCard
            </h1>

            <p className="hero-text">
              Offres spéciales, promotions et avantages exclusifs sélectionnés pour vous.
            </p>

            <button className="hero-btn" onClick={() => setZencardOpen(true)}>
              💳 Recharger ma ZenCard
            </button>
          </div>
        </section>

        {/* SECTION */}
        <section className="bonsplans-section">
          <div className="container">
            <div style={{ textAlign: 'center' }}>
              <span className="section-tag">Offres & Promotions</span>
              <h2 className="section-title">Nos bons plans du moment</h2>
            </div>

            <div className="bp-grid">
              {galleryItems.map((item) => (
                <div
                  className="bp-card"
                  key={item.img}
                  onClick={() => setLightbox({ image: item.img, title: item.title })}
                >
                  <span className="bp-badge">ZenCard</span>

                  <img src={item.img} className="bp-img" alt={item.alt} />

                  <div className="bp-overlay">
                    <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>
                      🔍 Agrandir
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
                  Bon Plan
                </span>

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--blue-deep)',
                    marginBottom: '10px',
                  }}
                >
                  Formation Gratuite : Excel RH
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--gray)',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                  }}
                >
                  Kapi Consult vous offre un accès gratuit à sa formation Excel RH.
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
                  Voir le détail →
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
            ✕
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
            ✕
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
            Recharge ZenCard
          </h2>

          <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.7 }}>
            Le système de recharge sera bientôt disponible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BonPlan;
