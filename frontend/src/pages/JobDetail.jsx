import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { offres } from '../data/mockData.js';
import './JobDetail.css';

const initialForm = { nom: '', email: '', telephone: '' };

function JobDetail() {
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
        <h1>Offre introuvable</h1>
        <p>
          Cette offre n'existe pas ou n'est plus disponible.{' '}
          <Link to="/carrieres">Retour aux offres</Link>
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
            <h2>Félicitations !</h2>
            <p>Votre candidature a été envoyée avec succès.</p>
            <button onClick={() => setSuccess(false)}>Fermer</button>
          </div>
        </div>
      )}

      <section className="job-hero">
        <div className="container">
          <h1>{offre.titre}</h1>

          <p>Rejoignez ZENER et participez à la transformation énergétique du Togo.</p>

          <div className="job-meta">
            <span>📍 {offre.ville}</span>
            <span>{offre.type_contrat}</span>
            <span>{offre.departement}</span>
          </div>
        </div>
      </section>

      <section className="job-wrapper">
        <div className="container">
          <Link to="/carrieres" className="back-link">
            ← Retour aux offres
          </Link>

          <div className="job-layout">
            <div className="job-card">
              <div className="section-job">
                <h2>Description du poste</h2>
                {offre.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="section-job">
                <h2>Missions principales</h2>
                {offre.missions.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="section-job">
                <h2>Profil recherché</h2>
                {offre.profil.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <div className="info-item">
                <span className="info-label">Localisation</span>
                {offre.ville}
              </div>

              <div className="info-item">
                <span className="info-label">Contrat</span>
                {offre.type_contrat}
              </div>

              <div className="info-item">
                <span className="info-label">Département</span>
                {offre.departement}
              </div>

              <div className="info-item">
                <span className="info-label">Date de publication</span>
                {new Date(offre.created_at).toLocaleDateString('fr-FR')}
              </div>

              <div className="info-item">
                <span className="status-active">Offre active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="apply-section">
        <div className="container">
          <div className="form-container">
            <h2 className="form-title">Postuler à cette offre</h2>
            <p className="form-subtitle">
              Remplissez le formulaire ci-dessous pour envoyer votre candidature.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Téléphone *</label>
                  <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>CV *</label>
                  <input type="file" name="cv" required />
                </div>

                <div className="form-group full">
                  <label>Motivation</label>
                  <textarea
                    name="message"
                    placeholder="Présentez votre profil, vos compétences et votre motivation..."
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
    </div>
  );
}

export default JobDetail;
