import client, { removeAuthorizationHeader } from "../../api/client"
import storage from '../../utils/storage';

export const getUserInfo = ()=>{
    return client
    .get('/api/user')
    .then(response => response)
    .catch(error => error)
}

export const deleteUser =()=>{
    return client
    .delete('/api/user/delete')
    .then(response=>{
        if (response === 'success'){
            removeAuthorizationHeader();
            storage.remove('auth');
        }
    })
    .catch(error => error)
}