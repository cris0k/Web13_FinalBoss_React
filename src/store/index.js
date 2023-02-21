import { configureStore } from "@reduxjs/toolkit";
// reducer
import adverts from "./slices/adverts";
import authSlice from "./slices/authSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        adverts
    }
})

export default store