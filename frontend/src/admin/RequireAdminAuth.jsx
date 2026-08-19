import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

function RequireAdminAuth({ children }) {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAdminAuth;
