import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: false
        
    },
    reducers: {
        authLogin :(state, action)=> {
            const {name, token} = action.payload
            state.name = name
            state.token = token
            state.auth = true
        },
        authLogout :(state,action)=>{
            state.name = null
            state.token = null
            state.auth = false

        }
    }
})

export const { authLogin, authLogout }= authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = state => state.auth.name
export const selectCurrentToken = state => state.auth.token
export const getIsLogged = state => state.auth.auth;
