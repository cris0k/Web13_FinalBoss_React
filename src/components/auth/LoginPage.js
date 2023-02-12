import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import "../../style/LoginPage.css"
import { useDispatch } from "react-redux";
import { authLogin } from "../../store/slices/auth";
import { login } from "./service";


const LoginPage = () => {
    

    const [name, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [remember, setRemember] = useState(false)

    const handleChangeUsername = event => setUsername(event.target.value);
    const handleChangePassword = event => setPassword(event.target.value);
    
    const resetError = () => setError(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleRemember = () => setRemember(!remember)

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            resetError();
            setIsLoading(true);
            const userData = await login({name,password,remember})
            dispatch(authLogin({...userData,name}));
            const to = location.state?.from?.pathname || '/';
            navigate(to, { replace: true });
            

        } catch (error) {
            setError(error);
            setIsLoading(false);
            
        }

    };

    return <div className="login-form">
        <h1> Log In </h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name" 
            placeholder="Username"
            className="login-input"
            onChange={handleChangeUsername}
            value={name}/>
            
            <input
            type='password' 
            name="password" 
            placeholder="Password"
            className="login-input"
            onChange={handleChangePassword}
            value={password}/>

            <input
            type="checkbox"
            name="selector"
            label="Stay logged in"
            onChange={handleRemember}
            checked={remember}
            />
            
            <button 
            type="submit" 
            disabled={ !(name && password && !isLoading)}> Log In </button>
        </form>
        {error && (
        <div onClick={resetError} className="page-error">
          {error.message = 'Wrong email or password'}
          
        </div>
      )}
    </div>
}

export default LoginPage