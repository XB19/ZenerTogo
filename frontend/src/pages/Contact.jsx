import { useState } from 'react';
import './Contact.css';

const initialForm = { nom: '', email: '', telephone: '', sujet: '', message: '' };

function Contact() {
  const [form, setForm] = useState(initialForm);
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
            <span className="contact-badge">CONTACTEZ-NOUS</span>
            <h1>Parlons de vos besoins énergétiques</h1>
            <p>
              Notre équipe est à votre écoute pour répondre à toutes vos questions et
              vous accompagner dans vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* INFOS */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-header">
            <h2>Nos coordonnées</h2>
            <p>Retrouvez toutes les informations utiles pour joindre rapidement les équipes ZENER.</p>
          </div>

          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h3>Adresse</h3>
              <p>
                Lomé, Togo
                <br />
                Siège social ZENER
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <h3>Téléphone</h3>
              <p>+228 XX XX XX XX</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>contact@zener.tg</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>Horaires</h3>
              <p>
                Lun - Ven
                <br />
                08h00 à 17h00
              </p>
            </div>
          </div>

          {/* FORMULAIRE */}
          <section className="contact-form-section">
            <div className="container">
              <div className="contact-form-wrapper">
                <div className="contact-form-header">
                  <h2>Envoyez-nous un message</h2>
                  <p>Remplissez ce formulaire et notre équipe vous répondra dans les meilleurs délais.</p>
                </div>

                {submitted && (
                  <div className="success-alert">
                    <div className="success-icon">
                      <i className="fa-solid fa-check"></i>
                    </div>

                    <div>
                      <h4>Message envoyé avec succès</h4>
                      <p>Merci pour votre prise de contact. Notre équipe vous répondra dans les plus brefs délais.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nom complet *</label>
                      <input
                        type="text"
                        name="nom"
                        placeholder="Votre nom complet"
                        value={form.nom}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Adresse email *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="exemple@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="text"
                        name="telephone"
                        placeholder="+228 XX XX XX XX"
                        value={form.telephone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Sujet *</label>
                      <input
                        type="text"
                        name="sujet"
                        placeholder="Objet de votre demande"
                        value={form.sujet}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group full">
                      <label>Votre message *</label>
                      <textarea
                        name="message"
                        placeholder="Décrivez votre demande..."
                        value={form.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="contact-btn">
                    <i className="fa-solid fa-paper-plane"></i>
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* CARTE */}
          <section className="map-section">
            <div className="container">
              <h2>Nous localiser</h2>
              <div className="map-box">Google Maps ici</div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Contact;
