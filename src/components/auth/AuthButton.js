import { Link } from 'react-router-dom';
import ConfirmationButton from '../common/ConfirmationButton';
import { useSelector } from 'react-redux';
import { logout } from './service';



const AuthButton = () => {
  const { userToken } = useSelector((state) => state.auth)
  //const dispatch = useDispatch()

  const handleLogoutConfirm = async () => {
    try {
      await logout()
      
    } catch (error) {
      console.log(error);
    }
    
  };

  return userToken ? (
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