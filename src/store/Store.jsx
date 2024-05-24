// store.js
import { configureStore } from '@reduxjs/toolkit';
import AgeReducer from '../reducers/AgeSlice';

export default configureStore({
  reducer: {
    age: AgeReducer,
  },
});
