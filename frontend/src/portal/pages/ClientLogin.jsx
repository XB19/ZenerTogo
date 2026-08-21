import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useClientAuth } from '../ClientAuthContext.jsx';
import './ClientLogin.css';

function ClientLogin() {
  const { isAuthenticated, login } = useClientAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/portail-client/profil';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/portail-client/profil', { replace: true });
    } catch (err) {
      const detail = err.data?.detail || err.data?.non_field_errors?.[0];
      setError(detail || 'Identifiants invalides.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="portal-page-clientlogin">
      <div className="login-card">
        <div className="logo">
          <img src="/images/logo.png" alt="ZENER" />
        </div>

        <p className="subtitle">Connectez-vous à votre espace client ZENER.</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={submitting}>
            {submitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="footer-text">
          Pas encore de compte ? <Link to="/portail-client/inscription">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;
