import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    list: [],
  },
  reducers: {
    setAdvertsList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setAdvertsList } = advertsSlice.actions;
export default advertsSlice.reducer;

export const fetchAllAdverts = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/adverts")
    .then((response) => {
      dispatch(setAdvertsList(response.data));
    })
    .catch((error) => console.log(error));
};
