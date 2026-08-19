import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuthContext.jsx';
import './Login.css';

function Login() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/admin-panel';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = login(username, password);

    if (!ok) {
      setError('Identifiants invalides.');
      return;
    }

    navigate('/admin-panel', { replace: true });
  };

  return (
    <div className="admin-page-login">
      <div className="login-card">
        <div className="logo">
          <img src="/images/logo.png" alt="ZENER" />
        </div>

        <p className="subtitle">Connectez-vous pour accéder au tableau de bord.</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur</label>
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

        <div className="footer-text">Administration sécurisée Zener</div>
      </div>
    </div>
  );
}

export default Login;
