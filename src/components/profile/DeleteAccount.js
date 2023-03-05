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

    const handleDelete = async()=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser()
                    dispatch(logoutSlice())
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
                
            }).then(()=> navigate('/'))
            .catch(error=>error)
    }
   
  
    return <NavLink onClick={handleDelete}>{t('Delete account')}</NavLink>

;}

export default DeleteAccount