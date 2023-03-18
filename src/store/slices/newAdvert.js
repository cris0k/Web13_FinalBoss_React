import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	userOwner: '',
	company: '',
	PGI: '',
	sale: '',
	price: 0,
	photo: '',
	category: [],
	description: '',
};

export const newAdvertSlice = createSlice({
	name: 'newAdvert',
	initialState,
	reducers: {
		setAdvertData: (state, action) => {
			state.initialState = action.payload;
		},
	},
});

export const { setAdvertData } = newAdvertSlice.actions;

export default newAdvertSlice.reducer;
