import { configureStore } from "@reduxjs/toolkit";
// reducer
import auth from './slices/auth'

export default configureStore({
    reducer: {
        auth
    }
})