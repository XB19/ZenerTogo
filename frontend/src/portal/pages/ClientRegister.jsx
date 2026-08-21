import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useClientAuth } from '../ClientAuthContext.jsx';
import './ClientRegister.css';

const initialForm = {
  prenom: '',
  nom: '',
  email: '',
  password: '',
  passwordConfirm: '',
  telephone: '',
  ville: '',
  adresse: '',
};

function ClientRegister() {
  const { isAuthenticated, register } = useClientAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/portail-client/profil" replace />;
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.passwordConfirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setSubmitting(true);

    try {
      const { passwordConfirm: _passwordConfirm, ...payload } = form;
      await register(payload);
      navigate('/portail-client/profil', { replace: true });
    } catch (err) {
      const fieldErrors = err.data && typeof err.data === 'object' ? Object.values(err.data).flat() : [];
      setError(fieldErrors[0] || "L'inscription a échoué. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="portal-page-clientregister">
      <div className="register-card">
        <div className="logo">
          <img src="/images/logo.png" alt="ZENER" />
        </div>

        <p className="subtitle">Créez votre espace client ZENER en quelques instants.</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Prénom</label>
              <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Nom</label>
              <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
            </div>

            <div className="form-group full">
              <label>Adresse email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                name="passwordConfirm"
                value={form.passwordConfirm}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Ville</label>
              <input type="text" name="ville" value={form.ville} onChange={handleChange} />
            </div>

            <div className="form-group full">
              <label>Adresse</label>
              <input type="text" name="adresse" value={form.adresse} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={submitting}>
            {submitting ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>

        <div className="footer-text">
          Déjà un compte ? <Link to="/portail-client/connexion">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

export default ClientRegister;
