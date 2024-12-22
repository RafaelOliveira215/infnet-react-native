// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  markers: [],
  countries:[],
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addMarker(state, action) {
      state.markers.push(action.payload);
    },
    setCountries(state, action) {
      state.countries.push(action.payload);
    },
  },
});

export const { toggleTheme, addMarker, setCountries  } = themeSlice.actions;
export default themeSlice.reducer;
