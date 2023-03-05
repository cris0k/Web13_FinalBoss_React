import {  NavLink, useNavigate } from "react-router-dom"
import { deleteUser } from "./service";
import Swal from "sweetalert2"
import { useDispatch } from "react-redux";
import {logoutSlice} from '../../store/slices/authSlice'
import { useTranslation } from "react-i18next";

const DeleteAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [t] = useTranslation("translation");

    const handleDelete = ()=>{
            Swal.fire({
                title: t('Are you sure?'),
                text: t("You won't be able to revert this!"),
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: t('Cancel'),
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: t('Yes, delete it')
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser()
                    dispatch(logoutSlice())
                  Swal.fire(
                    t('Deleted!'),
                    t('Your account has been deleted.'),
                    'success'
                  )
                }
                
            }).then(()=> navigate('/'))
            .catch(error=>error)
    }
   
  
    return <NavLink onClick={handleDelete}>{t('Delete account')}</NavLink>

;}

export default DeleteAccount