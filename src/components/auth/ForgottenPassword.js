import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { forgottenPasswords} from '../../store/actions/authActions'
import '../../style/form.css'

const ForgetPassword = () => {
  const { loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const submitForm = (credentials) => {
    console.log(credentials)
    dispatch(forgottenPasswords(credentials))
    
  }
    return <div className="Reset-form">
        <h1>Password Reset </h1>
        <form className='reset-psw-form' onSubmit={handleSubmit(submitForm)}>
            <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
            type='text'
            className='form-input'
            {...register('email')}
            required
            />
        </div>
        <button type='submit' className='button-log' disabled={loading}>
            Submit
        </button>
            </form>
          
        </div>
}

export default ForgetPassword