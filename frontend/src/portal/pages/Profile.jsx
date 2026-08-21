import { useEffect, useState } from 'react';
import { useClientAuth } from '../ClientAuthContext.jsx';
import './ClientPortalPages.css';

function Profile() {
  const { user, updateProfile } = useClientAuth();
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(user);
  }, [user]);

  if (!form) return null;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { prenom, nom, email, telephone, ville, adresse } = form;
      await updateProfile({ prenom, nom, email, telephone, ville, adresse });
      setSaved(true);
    } catch (err) {
      const fieldErrors = err.data && typeof err.data === 'object' ? Object.values(err.data).flat() : [];
      setError(fieldErrors[0] || 'La mise à jour a échoué. Merci de réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="cp-page-title">Mon profil</h1>
      <p className="cp-page-subtitle">Consultez et mettez à jour vos informations personnelles.</p>

      <div className="cp-card">
        {saved && (
          <div className="cp-badge cp-badge-green" style={{ marginBottom: '20px', display: 'inline-block' }}>
            Profil mis à jour avec succès
          </div>
        )}

        {error && (
          <div className="cp-badge" style={{ marginBottom: '20px', display: 'inline-block', background: '#ffe8e8', color: '#dc2626' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="cp-form-grid">
            <div className="cp-form-group">
              <label>Prénom</label>
              <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required />
            </div>

            <div className="cp-form-group">
              <label>Nom</label>
              <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
            </div>

            <div className="cp-form-group">
              <label>Adresse email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="cp-form-group">
              <label>Téléphone</label>
              <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} />
            </div>

            <div className="cp-form-group">
              <label>Ville</label>
              <input type="text" name="ville" value={form.ville} onChange={handleChange} />
            </div>

            <div className="cp-form-group">
              <label>Adresse</label>
              <input type="text" name="adresse" value={form.adresse} onChange={handleChange} />
            </div>
          </div>

          {form.date_inscription && (
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
              Client ZENER depuis le {new Date(form.date_inscription).toLocaleDateString('fr-FR')}
            </p>
          )}

          <button type="submit" className="cp-btn-primary" disabled={submitting}>
            {submitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
