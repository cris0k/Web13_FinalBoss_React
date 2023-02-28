import { configureStore } from "@reduxjs/toolkit";
import { configureClient } from "../api/client";
import storage from "../utils/storage";
// reducer
import adverts from "./slices/adverts";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";

const token = storage.get('auth');
configureClient({ token });

const store = configureStore({
    reducer: {
        auth: authSlice,
        adverts,
        user : userSlice
    },
    preloadedState :{
        auth:{
            token
        }
    }
})


export default store