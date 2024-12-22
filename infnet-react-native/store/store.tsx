// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,  // Add the theme slice to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
