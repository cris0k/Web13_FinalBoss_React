import { createSlice } from '@reduxjs/toolkit'
import storage from '../../utils/storage'
import { registerUser, userLogin } from '../actions/authActions'


// initialize userToken from local storage
const token = storage.get('auth')
  ? storage.get('auth')
  : null

const initialState = {
  loading: false,
  token,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutSlice: (state) => {
      state.loading = false
      state.token = null
      state.error = null
      state.success = true
    },
    setCredentials: (state, { payload }) => {
      state.token = payload
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload } ) => {
      state.loading = false
      state.token = payload
      state.success = true
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.token = payload // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logoutSlice, setCredentials } = authSlice.actions

export default authSlice.reducer
