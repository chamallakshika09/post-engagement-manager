import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
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
  selectedPosts: string[];
  searchQuery: string;
  sortConfig: { key: keyof Post; direction: 'ascending' | 'descending' } | null;
  currentPage: number;
  itemsPerPage: number;
  modalType: 'rename' | 'delete' | 'bulkDelete' | null;
  currentPost: Post | null;
  newName: string;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
  selectedPosts: [],
  searchQuery: '',
  sortConfig: null,
  currentPage: 1,
  itemsPerPage: 10,
  modalType: null,
  currentPost: null,
  newName: '',
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
    setSelectedPosts: (state, action: PayloadAction<string[]>) => {
      state.selectedPosts = action.payload;
    },
    deleteSelectedPosts: (state) => {
      state.posts = state.posts.filter((post) => !state.selectedPosts.includes(post.key));
      state.selectedPosts = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortConfig: (
      state,
      action: PayloadAction<{ key: keyof Post; direction: 'ascending' | 'descending' } | null>
    ) => {
      state.sortConfig = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    openModal: (state, action: PayloadAction<{ modalType: 'rename' | 'delete' | 'bulkDelete'; post?: Post }>) => {
      const { modalType, post } = action.payload;
      state.modalType = modalType;
      if (post) {
        state.currentPost = post;
        state.newName = post.name;
      }
    },
    closeModal: (state) => {
      state.modalType = null;
      state.currentPost = null;
      state.newName = '';
    },
    setNewName: (state, action: PayloadAction<string>) => {
      state.newName = action.payload;
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
    selectSortConfig: (sliceState) => sliceState.sortConfig,
    selectCurrentPage: (sliceState) => sliceState.currentPage,
    selectItemsPerPage: (sliceState) => sliceState.itemsPerPage,
    selectModalType: (sliceState) => sliceState.modalType,
    selectCurrentPost: (sliceState) => sliceState.currentPost,
    selectNewName: (sliceState) => sliceState.newName,
  },
});

export const {
  addPost,
  removePost,
  updatePost,
  deleteSelectedPosts,
  setSelectedPosts,
  setSearchQuery,
  setSortConfig,
  setCurrentPage,
  setItemsPerPage,
  openModal,
  closeModal,
  setNewName,
} = postsSlice.actions;

export const {
  selectPosts,
  selectStatus,
  selectError,
  selectSelectedPosts,
  selectSearchQuery,
  selectSortConfig,
  selectCurrentPage,
  selectItemsPerPage,
  selectModalType,
  selectCurrentPost,
  selectNewName,
} = postsSlice.selectors;

export default postsSlice.reducer;

export const selectFilteredPosts = createSelector([selectPosts, selectSearchQuery], (posts, searchQuery) =>
  posts.filter((post) => post.name.toLowerCase().includes(searchQuery.toLowerCase()))
);

export const selectSortedPosts = createSelector(
  [selectFilteredPosts, selectSortConfig],
  (filteredPosts, sortConfig) => {
    if (!sortConfig) return filteredPosts;

    return [...filteredPosts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }
);

export const selectPaginatedPosts = createSelector(
  [selectSortedPosts, selectCurrentPage, selectItemsPerPage],
  (sortedPosts, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  }
);
