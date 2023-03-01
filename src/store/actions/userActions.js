import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo } from '../../components/profile/service';


export const profileData = createAsyncThunk(
    'profile/user',
    async ()=>{

        try {
            const userData = await getUserInfo()
            
            return userData
            
        } catch (error) {
            console.log(error);
        }
    }
)