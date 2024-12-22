// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',  // Default theme
  markers: [],
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addMarker(state, action) {
      state.markers.push(action.payload);  // Adiciona o novo marcador à lista
    },
  },
});

export const { toggleTheme, addMarker  } = themeSlice.actions;
export default themeSlice.reducer;
