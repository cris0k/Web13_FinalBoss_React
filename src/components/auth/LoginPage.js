import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../Error'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { userLogin } from '../../store/actions/authActions'

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
        <h1> Log In </h1>
        <form onSubmit={handleSubmit(submitForm)}>
            <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
            type='text'
            className='form-input'
            {...register('name')}
            required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
            type='password'
            className='form-input'
            {...register('password')}
            required
            />
        </div>
        <div>
        <span>Remember</span>
        <input
          type="checkbox"
          name="remember"
          {...register('remember')}
        />
        </div>
        <button type='submit' className='button' disabled={loading}>
            Login
        </button>
            {error && <Error>{error}</Error>}
            </form>
          
        </div>
}

export default LoginPage