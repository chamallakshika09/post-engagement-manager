import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/data';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions;

export default postsSlice.reducer;
