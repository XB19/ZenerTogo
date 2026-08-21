import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useBackOfficeAuth } from '../BackOfficeAuthContext.jsx';
import './BackOfficeLogin.css';

function BackOfficeLogin() {
  const { isAuthenticated, login } = useBackOfficeAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/back-office';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = login(username, password);

    if (!ok) {
      setError('Identifiants invalides.');
      return;
    }

    navigate('/back-office', { replace: true });
  };

  return (
    <div className="bo-page-backofficelogin">
      <div className="login-card">
        <div className="logo">
          <img src="/images/logo.png" alt="ZENER" />
        </div>

        <p className="subtitle">Customer Care — connexion agent.</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Identifiant agent</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" className="login-btn">
            Se connecter
          </button>
        </form>

        <div className="footer-text">Espace réservé aux agents Customer Care ZENER</div>
      </div>
    </div>
  );
}

export default BackOfficeLogin;
