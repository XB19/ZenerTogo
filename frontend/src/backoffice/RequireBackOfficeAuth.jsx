import { Navigate, useLocation } from 'react-router-dom';
import { useBackOfficeAuth } from './BackOfficeAuthContext.jsx';

function RequireBackOfficeAuth({ children }) {
  const { isAuthenticated } = useBackOfficeAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/back-office/connexion" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireBackOfficeAuth;
