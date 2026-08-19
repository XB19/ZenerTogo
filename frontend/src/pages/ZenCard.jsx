import { useState } from 'react';
import './ZenCard.css';

const stationsRetrait = [
  'Zener Hedzranawoe',
  'Zener Adidogome',
  'Zener Agoe',
  'Zener GTA',
  'Zener Port',
  'Zener Baguida',
  'Zener Kpalime',
  'Zener Atakpame',
  'Zener Sokode',
  'Zener Kara',
  'Zener Dapaong',
];

const initialForm = { nom: '', telephone: '', email: '', ville: '', type: '', station: '' };

function ZenCard() {
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
            <span className="zencard-badge">ZENCARD</span>
            <h1>La carte qui simplifie vos achats de carburant</h1>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-heading">
            <h2>Pourquoi choisir la ZenCard ?</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Paiement rapide</h3>
              <p>Gagnez du temps à chaque passage en station.</p>
            </div>
            <div className="benefit-card">
              <h3>Sécurisée</h3>
              <p>Une solution fiable pour vos transactions.</p>
            </div>
            <div className="benefit-card">
              <h3>Suivi facile</h3>
              <p>Gardez le contrôle de vos dépenses carburant.</p>
            </div>
            <div className="benefit-card">
              <h3>Acceptée partout</h3>
              <p>Utilisable dans le réseau des stations ZENER.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ETAPES */}
      <section className="steps-section">
        <div className="container">
          <div className="section-heading">
            <h2>Comment obtenir votre ZenCard ?</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Remplissez le formulaire</h3>
              <p>Quelques informations suffisent.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Validation</h3>
              <p>Notre équipe traite votre demande.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Récupérez votre carte</h3>
              <p>Votre ZenCard est prête à être utilisée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="form-section" id="top">
        <div className="container">
          <div className="form-wrapper">
            <h2>Demande de ZenCard</h2>

            {submitted && (
              <p style={{ color: '#4b8f1e', fontWeight: 600, marginBottom: '20px' }}>
                Votre demande a bien été envoyée. Notre équipe vous contactera bientôt.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nom complet</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Téléphone</label>
                  <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Ville</label>
                  <input type="text" name="ville" value={form.ville} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Type de demande</label>
                  <select name="type" value={form.type} onChange={handleChange} required>
                    <option value="">Sélectionner</option>
                    <option value="Particulier">Particulier</option>
                    <option value="Entreprise">Entreprise</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Station de retrait</label>
                  <select name="station" value={form.station} onChange={handleChange} required>
                    <option value="">Choisir une station</option>
                    {stationsRetrait.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full">
                  <label>Photo de la CNI</label>
                  <input type="file" name="cni" accept="image/*" required />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="zencard-cta">
        <div className="container">
          <h2>Rejoignez les utilisateurs ZenCard</h2>
          <p>Une solution moderne pensée pour faciliter votre mobilité.</p>

          <a href="#top" className="cta-btn">
            Demander maintenant
          </a>
        </div>
      </section>
    </div>
  );
}

export default ZenCard;
