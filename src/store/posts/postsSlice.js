import {createSlice} from '@reduxjs/toolkit';
import {postsRequestAsync} from './postsAction';

const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  page: '',
  pageNumber: 0,
  isLast: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsClear: (state) => {
      state.posts = [];
      state.after = '';
      state.pageNumber = 0;
      state.isLast = false;
      state.isloading = false;
      state.error = '';
    },
    changePage: (state, action) => {
      state.posts = [];
      state.after = '';
      state.pageNumber = 0;
      state.isLast = false;
      state.isloading = false;
      state.error = '';
      state.page = action.payload;
    }
  },
  extraReducers: {
    [postsRequestAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [postsRequestAsync.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
      state.loading = false;
      state.error = '';
      state.pageNumber = action.payload.pageNumber;
      state.page = action.payload.page;
    },
    [postsRequestAsync.rejected]: (state, action) => { // ???
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export default postsSlice.reducer;
