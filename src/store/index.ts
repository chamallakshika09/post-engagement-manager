import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import postsSlice from './postsSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
