import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    users: [],
    messages: [],

};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        message: (state, {payload}) => {
            state.messages = payload;
    },
        user:(state, {payload}) => {
            state.users = payload;
            
        }
    },
    
})
export const { message, user } = chatSlice.actions

export default chatSlice.reducer;