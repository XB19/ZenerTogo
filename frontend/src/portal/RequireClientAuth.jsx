import { Navigate, useLocation } from 'react-router-dom';
import { useClientAuth } from './ClientAuthContext.jsx';

function RequireClientAuth({ children }) {
  const { isAuthenticated, loading } = useClientAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/portail-client/connexion" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireClientAuth;
