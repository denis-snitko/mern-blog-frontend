import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ url, query }) => {
  const { data } = await axios.get(url, { params: { ...query } });
  return data;
});
export const fetchFilteredPosts = createAsyncThunk('posts/fetchFilteredPosts', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/tags/${params}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchTags = createAsyncThunk('tags/fetchPosts', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    data: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePost: (state, action) => {
      const { id } = action.payload;
      state.posts.items = state.posts.items.filter((item) => item._id !== id);
    },
  },

  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.data = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.data = [];
      state.posts.status = 'error';
    },

    [fetchFilteredPosts.pending]: (state) => {
      state.posts.data = [];
      state.posts.status = 'loading';
    },
    [fetchFilteredPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchFilteredPosts.rejected]: (state) => {
      state.posts.data = [];
      state.posts.status = 'error';
    },

    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
  },
});

export const { deletePost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
