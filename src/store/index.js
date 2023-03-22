import { configureStore } from '@reduxjs/toolkit';
import { configureClient } from '../api/client';
import storage from '../utils/storage';
// reducer
import adverts from "./slices/adverts";
import authSlice from "./slices/authSlice";
import chatSlice from "./slices/chatSlice";
import userSlice from "./slices/userSlice";

const token = storage.get('auth');
configureClient({ token });

const store = configureStore({
  reducer: {
    auth: authSlice,
    adverts,
    user: userSlice,
    chat:chatSlice,
  },
  preloadedState: {
    auth: {
      token,
    },
  },
});

export default store;
