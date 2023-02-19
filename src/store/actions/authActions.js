import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../api/client';
import { login } from '../../components/auth/service'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ name,password }, { rejectWithValue }) => {
    try {
      const data = await login({ name,password})   
      console.log(data);
      return data
     
    } catch (error) {

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
       const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await client.post(
        `/api/register`,
        { name, email, password }, config
       
      ) 
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)