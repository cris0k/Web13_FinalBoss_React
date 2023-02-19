import { createSlice } from "@reduxjs/toolkit";

import client from "../../api/client"
const advertUrl = "/api/adverts";

export const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    list: [],
  },
  reducers: {
    setAdvertsList: (state, action) => {
      state.list = action.payload;
    },
    setAdvertDetail: (state, action) => {
      state.list = [action.payload];
    },
  },
});

export const { setAdvertsList, setAdvertDetail } = advertsSlice.actions;
export default advertsSlice.reducer;

export const fetchAllAdverts = () => (dispatch) => {
  client
    .get(advertUrl)
    .then((response) => {
      dispatch(setAdvertsList(response.results));
    })
    .catch((error) => console.log(error));
};

export const getUniqueAdvert = (advertId) => (dispatch) => {
  client
    .get(`${advertUrl}/${advertId}`)
    .then((response) => {
      dispatch(setAdvertDetail(response.data));
    })
    .catch((error) => console.log(error));
};
