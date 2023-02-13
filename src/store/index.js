import { configureStore } from "@reduxjs/toolkit";
// reducer
import auth from './slices/auth'
import adverts from "./slices/adverts";


export default configureStore({
    reducer: {
        auth,
        adverts
    }
})