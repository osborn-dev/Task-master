import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the requested component
  return children;
};

export default ProtectedRoute;
