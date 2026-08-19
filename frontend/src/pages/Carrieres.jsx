import { useState } from 'react';
import { Link } from 'react-router-dom';
import { offres } from '../data/mockData.js';
import './Carrieres.css';

const initialForm = { nom: '', email: '', telephone: '', poste: '', message: '' };

function Carrieres() {
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
        <div className="success-message">Votre candidature a bien été envoyée.</div>
      )}

      {/* HERO */}
      <section className="career-hero">
        <div className="career-overlay"></div>

        <div className="container">
          <div className="career-content">
            <span className="career-badge">CARRIÈRES</span>
            <h1>Construisez votre avenir avec ZENER</h1>
            <p>
              Rejoignez une entreprise dynamique qui participe activement au
              développement énergétique du Togo et investit dans le talent de ses
              collaborateurs.
            </p>
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
              <h2>Pourquoi rejoindre ZENER ?</h2>
              <p>
                Chez ZENER, nous croyons que notre réussite repose sur les femmes et les
                hommes qui composent notre équipe. Nous favorisons le développement des
                compétences, l'innovation et l'esprit d'équipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="hr-values">
        <div className="container">
          <div className="section-title">
            <h2>Nos engagements RH</h2>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <h3>Formation</h3>
              <p>Développer les compétences.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Encourager les idées nouvelles.</p>
            </div>
            <div className="value-card">
              <h3>Évolution</h3>
              <p>Offrir des perspectives de carrière.</p>
            </div>
            <div className="value-card">
              <h3>Bien-être</h3>
              <p>Valoriser chaque collaborateur.</p>
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
              Partenaires
            </div>
            <div className="stat-box">
              <span>25+</span>
              Stations
            </div>
            <div className="stat-box">
              <span>15+</span>
              Ans d'expérience
            </div>
            <div className="stat-box">
              <span>100%</span>
              Engagement
            </div>
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section className="jobs-section">
        <div className="container">
          <div className="section-title">
            <h2>Offres d'emploi</h2>
          </div>

          <div className="jobs-list">
            {offres.length === 0 ? (
              <div className="no-job">
                <i className="ri-briefcase-line"></i>
                <h3>Aucune offre disponible actuellement</h3>
                <p>Revenez bientôt pour découvrir nos nouvelles opportunités.</p>
              </div>
            ) : (
              offres.map((offre) => (
                <div className="job-card" key={offre.id}>
                  <div className="job-info">
                    <h3>{offre.titre}</h3>

                    <p>
                      <strong>{offre.ville}</strong> • {offre.type_contrat}
                      {offre.departement && <> • {offre.departement}</>}
                    </p>

                    {offre.date_limite && (
                      <div className="job-date">
                        Date limite : {new Date(offre.date_limite).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>

                  <Link to={`/carrieres/offre/${offre.id}`} className="job-btn">
                    Postuler
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
            <h2>Candidature spontanée</h2>
            <p>
              Vous ne trouvez pas l'offre correspondant à votre profil ? Envoyez-nous
              votre candidature et notre équipe l'étudiera avec attention.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom complet"
                    value={form.nom}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Adresse email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="telephone"
                    placeholder="Téléphone"
                    value={form.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="poste"
                    placeholder="Poste recherché"
                    value={form.poste}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="file-label">Curriculum Vitae (CV) *</label>
                  <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
                </div>

                <div className="form-group">
                  <label className="file-label">Lettre de motivation</label>
                  <input type="file" name="lettre_motivation" accept=".pdf,.doc,.docx" />
                </div>

                <div className="form-group full">
                  <textarea
                    name="message"
                    placeholder="Présentez brièvement votre profil, vos compétences ou votre motivation..."
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Envoyer ma candidature
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="career-cta">
        <div className="container">
          <h2>Rejoignez l'aventure ZENER</h2>
          <p>Ensemble, construisons l'énergie de demain.</p>

          <Link to="/contact" className="cta-btn">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Carrieres;
