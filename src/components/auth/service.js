import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader,
  } from '../../api/client';

  import storage from '../../utils/storage';
  
  export const login = ({remember, ...credentials}) => {
    return client
    .post('/api/login', credentials)
    .then(({ token }) => {
      setAuthorizationHeader(token);
      storage.remove('auth');
      if (remember) {
        storage.set('auth', token);
      }
      return token
    });
  };
  
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };

  export const userInfo = ()=>{
    return client
    .get('/api/profile')
    .then(response => console.log(response))
  }
  export const forgottenPassword = (credentials) => {
    
    return client
    .post('/api/requestPasswordReset', credentials)
    .then(credentials => console.log(credentials))
  };
  export const changePassword = (credentials) => {
    console.log(credentials)
    return client
    .put('/api/passwordChange', credentials)
    .then(credentials => console.log(credentials))
  };