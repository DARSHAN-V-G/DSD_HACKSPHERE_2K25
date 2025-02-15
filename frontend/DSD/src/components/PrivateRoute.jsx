import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/patient/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // If a specific role is required and user doesn't have it, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;