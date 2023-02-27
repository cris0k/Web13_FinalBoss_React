import { configureStore } from "@reduxjs/toolkit";
// reducer
import adverts from "./slices/adverts";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        adverts,
        user : userSlice
    }
})

export default store