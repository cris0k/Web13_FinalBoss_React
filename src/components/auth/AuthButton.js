import { Link } from 'react-router-dom';
import ConfirmationButton from '../common/ConfirmationButton';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout, getIsLogged } from '../../store/slices/auth';
import { logout } from './service';



const AuthButton = () => {
  const isLogged = useSelector(getIsLogged)
  const dispatch = useDispatch()

  const handleLogoutConfirm = async () => {
    try {
      await logout()
      dispatch(authLogout())
    } catch (error) {
      console.log(error);
    }
    
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

export default AuthButton;