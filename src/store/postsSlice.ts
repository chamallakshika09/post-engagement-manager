import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/data';
import { initialPosts } from '../data/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return new Promise<Post[]>((resolve) =>
    setTimeout(() => {
      resolve(initialPosts);
    }, 1000)
  );
});

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedPosts: Set<string>;
  searchQuery: string;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
  selectedPosts: new Set(),
  searchQuery: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.key !== action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((post) => post.key === action.payload.key);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    setSelectedPosts: (state, action: PayloadAction<Set<string>>) => {
      state.selectedPosts = action.payload;
    },
    deleteSelectedPosts: (state) => {
      state.posts = state.posts.filter((post) => !state.selectedPosts.has(post.key));
      state.selectedPosts = new Set();
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
  selectors: {
    selectPosts: (sliceState) => sliceState.posts,
    selectStatus: (sliceState) => sliceState.status,
    selectError: (sliceState) => sliceState.error,
    selectSelectedPosts: (sliceState) => sliceState.selectedPosts,
    selectSearchQuery: (sliceState) => sliceState.searchQuery,
  },
});

export const { addPost, removePost, updatePost, deleteSelectedPosts, setSelectedPosts, setSearchQuery } =
  postsSlice.actions;
export const { selectPosts, selectStatus, selectError, selectSelectedPosts, selectSearchQuery } = postsSlice.selectors;

export default postsSlice.reducer;
