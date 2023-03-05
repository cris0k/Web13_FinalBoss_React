import { createSlice } from '@reduxjs/toolkit'
import { profileData } from '../actions/userActions'

const initialState = {
    userInfo : null,
    success: false,
    loading:false
  }

const userSlice = createSlice({
name: 'profile',
initialState,
extraReducers:{
    [profileData.pending]: (state) => {
        state.loading = true
        state.error = null
    },
    [profileData.fulfilled]: (state, { payload })=>{
        state.userInfo = payload
        state.success = true
        state.loading = false
    },
    [profileData.rejected]: (state, { payload }) => {
      state.error = payload
      state.loading = false
    },
},
})

export default userSlice.reducer