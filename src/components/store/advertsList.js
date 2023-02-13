import { configureStore } from "@reduxjs/toolkit";

import adverts from "./slices/adverts";

export default configureStore({
  reducer: {
    adverts,
  },
});
