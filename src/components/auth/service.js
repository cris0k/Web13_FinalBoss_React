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

    });
  };
  
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };