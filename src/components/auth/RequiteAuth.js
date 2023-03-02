import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const RequireAuth = ({ children }) => {
  const { token } = useSelector((state) => state.auth)
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;