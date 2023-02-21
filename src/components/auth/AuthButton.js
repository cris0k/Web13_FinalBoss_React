import { NavLink } from 'react-router-dom';
import ConfirmationButton from '../common/ConfirmationButton';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSlice } from '../../store/slices/authSlice';
import { logout } from './service';



const AuthButton = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogoutConfirm = async () => {
    try {
      await logout()
      dispatch(logoutSlice())

      
    } catch (error) {
      console.log(error);
    }
    
  };

  return token ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <NavLink className='button' to='/login'>Login</NavLink>
  );
};

export default AuthButton;