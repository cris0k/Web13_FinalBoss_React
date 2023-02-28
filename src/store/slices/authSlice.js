import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from '../actions/authActions'


const initialState = {
  loading: false,
  token: null,
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
    }
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

export const { logoutSlice } = authSlice.actions

export default authSlice.reducer
