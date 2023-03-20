import { createSlice } from "@reduxjs/toolkit";
import client from "../../api/client";
import { profileData } from "../actions/userActions";

const initialState = {
  userInfo: null,
  success: false,
  loading: false,
};

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { _id, ...restUserInfo } = action.payload;
      state.userInfo = { ...restUserInfo, id: _id };
    },
  },
  extraReducers: {
    [profileData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [profileData.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.success = true;
      state.loading = false;
    },
    [profileData.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { updateUser } = userSlice.actions;

export const addFavToArray = (user, advert) => (dispatch) => {
  // const userToUpdate = { ...user, favAdverts: [...user.favAdverts, advert] };
  const userAdvertsToUpdate = [...user.favAdverts, advert];
  client
    .put(`/api/user/${user.id}`, userAdvertsToUpdate)
    .then((response) => {
      dispatch(updateUser(response));
    })
    .catch((error) => console.log(error));
};

export const deleteFavToArray = (user, advert) => (dispatch) => {
  console.log(user);
  console.log(advert);
  const userAdvertsToUpdate = user.favAdverts.filter(
    ({ _id }) => _id !== advert._id
  );
  client
    .put(`/api/user/${user.id}`, userAdvertsToUpdate)
    .then((response) => {
      dispatch(updateUser(response));
    })
    .catch((error) => console.log(error));
};

export default userSlice.reducer;
