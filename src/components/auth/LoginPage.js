import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../Error'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { userLogin } from '../../store/actions/authActions'
import '../../style/form.css'

const LoginPage = () => {
  const { loading,userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitForm = (credentials) => {
    dispatch(userLogin(credentials))
    
  }


    return <div className="login-form">
        <h1 className='form-title'> Log In </h1>
        <form className='signin-up-form' onSubmit={handleSubmit(submitForm)}>
            <div className='form-group'>
            <input
            type='text'
            className='form-input'
            placeholder='Name'
            {...register('name')}
            required
            />
        </div>
        <div className='form-group'>
            <input
            type='password'
            className='form-input'
            placeholder='Password'
            {...register('password')}
            required
            />
        </div>
        <div>
        <span>Remember me</span>
        <input
          type="checkbox"
          name="remember"
          {...register('remember')}
        />
        </div>
        <button type='submit' className='button-log' disabled={loading}>
            Login
        </button>
        <NavLink className="nav-link">Forgot password?</NavLink>
            {error && <Error>{error}</Error>}
            </form>
          
        </div>
}

export default LoginPage