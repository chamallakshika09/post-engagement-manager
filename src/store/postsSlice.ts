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

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id: string) => {
  return new Promise<Post | null>((resolve) =>
    setTimeout(() => {
      const post = initialPosts.find((post) => post.key === id);
      if (!post) {
        resolve(null);
        return;
      }
      resolve(post);
    }, 1000)
  );
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post: Post) => {
  return new Promise<Post>((resolve) =>
    setTimeout(() => {
      resolve(post);
    }, 1000)
  );
});

interface PostsState {
  posts: Post[];
  fetchPostsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  fetchPostsError: string | null;
  selectedPosts: string[];
  searchQuery: string;
  sortConfig: { key: keyof Post; direction: 'ascending' | 'descending' } | null;
  currentPage: number;
  itemsPerPage: number;
  modalType: 'rename' | 'delete' | 'bulkDelete' | null;
  currentPost: Post | null;
  newName: string;
  fetchPostStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  fetchPostError: string | null;
  updatePostStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  updatePostError: string | null;
}

const initialState: PostsState = {
  posts: [],
  fetchPostsStatus: 'idle',
  fetchPostsError: null,
  selectedPosts: [],
  searchQuery: '',
  sortConfig: null,
  currentPage: 1,
  itemsPerPage: 10,
  modalType: null,
  currentPost: null,
  newName: '',
  fetchPostStatus: 'idle',
  fetchPostError: null,
  updatePostStatus: 'idle',
  updatePostError: null,
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
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchPostsStatus = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.fetchPostsStatus = 'succeeded';
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.fetchPostsStatus = 'failed';
      state.fetchPostsError = action.error.message ?? 'Something went wrong';
    });

    builder.addCase(fetchPost.pending, (state) => {
      state.fetchPostStatus = 'loading';
    });
    builder.addCase(fetchPost.fulfilled, (state, action: PayloadAction<Post | null>) => {
      state.fetchPostStatus = 'succeeded';
      state.currentPost = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.fetchPostStatus = 'failed';
      state.fetchPostError = action.error.message ?? 'Something went wrong';
    });

    builder.addCase(updatePost.pending, (state) => {
      state.updatePostStatus = 'loading';
    });
    builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.updatePostStatus = 'succeeded';
      const index = state.posts.findIndex((post) => post.key === action.payload.key);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.currentPost = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.updatePostStatus = 'failed';
      state.updatePostError = action.error.message ?? 'Something went wrong';
    });
  },
  selectors: {
    selectPosts: (sliceState) => sliceState.posts,
    selectFetchPostsStatus: (sliceState) => sliceState.fetchPostsStatus,
    selectFetchPostsError: (sliceState) => sliceState.fetchPostsError,
    selectSelectedPosts: (sliceState) => sliceState.selectedPosts,
    selectSearchQuery: (sliceState) => sliceState.searchQuery,
    selectSortConfig: (sliceState) => sliceState.sortConfig,
    selectCurrentPage: (sliceState) => sliceState.currentPage,
    selectItemsPerPage: (sliceState) => sliceState.itemsPerPage,
    selectModalType: (sliceState) => sliceState.modalType,
    selectCurrentPost: (sliceState) => sliceState.currentPost,
    selectNewName: (sliceState) => sliceState.newName,
    selectFetchPostStatus: (sliceState) => sliceState.fetchPostStatus,
    selectFetchPostError: (sliceState) => sliceState.fetchPostError,
    selectUpdatePostStatus: (sliceState) => sliceState.updatePostStatus,
    selectUpdatePostError: (sliceState) => sliceState.updatePostError,
  },
});

export const {
  addPost,
  removePost,
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
  selectFetchPostsStatus,
  selectFetchPostsError,
  selectSelectedPosts,
  selectSearchQuery,
  selectSortConfig,
  selectCurrentPage,
  selectItemsPerPage,
  selectModalType,
  selectCurrentPost,
  selectNewName,
  selectFetchPostStatus,
  selectFetchPostError,
  selectUpdatePostStatus,
  selectUpdatePostError,
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
