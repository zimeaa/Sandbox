import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/Slicers/counterSlice';
import postsReducer from '../redux/Slicers/postSlice';
import dataReducer from './Slicers/dataSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    data: dataReducer,
  },
});

export default store;
