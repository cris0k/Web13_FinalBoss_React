import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSlice } from '../../store/slices/authSlice';
import { logout } from './service';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';



const AuthButton = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [t] = useTranslation("translation");

  const handleLogoutConfirm = () => {
    try {
      Swal.fire({
        title: t('Are you sure?'),
        imageUrl: 'img/gato-con-botas.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'gato-con-botas',
        showCancelButton: true,
        cancelButtonText: t('Cancel'),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.isConfirmed) {
          logout()
          dispatch(logoutSlice())
        }
      })
      
    } catch (error) {
      console.log(error);
    }
    
  };

  return token ? (
    <button onClick={handleLogoutConfirm}>
      Logout
    </button>
  ) : (
    <div>
      <NavLink className='button-log' to='/login'>Login</NavLink>
    </div>
  );
};

export default AuthButton;