import { NavLink } from 'react-router-dom';
import ConfirmationButton from '../common/ConfirmationButton';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';



const AuthButton = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogoutConfirm = async () => {
    try {
      dispatch(logout())

      
    } catch (error) {
      console.log(error);
    }
    
  };

  return userInfo ? (
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