import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_AUTH_URL, API_URL} from '../../api/const';
// import {postsSlice} from './postsSlice';


export const postsRequestAsync = createAsyncThunk(
  'posts/fetch',
  (_, {getState, rejectWithValue}) => {
    const page = getState().posts.page;
    const token = getState().token.token;
    const {posts, after, isLast, pageNumber} = getState().posts;

    if (isLast) return;

    let url = '';
    let options = {};

    const searchUrl = `/${page}?limit=10${after ? `&after=${after}` : ''}`;

    if (token) {
      url = `${API_AUTH_URL}${searchUrl}`; // https://oauth.reddit.com/...
      options = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
    } else {
      url = `${API_URL}${searchUrl}`; // https://api.reddit.com/...
    }

    return axios(url, options)
      .then(({data}) => {
        let newPosts = data.data.children;
        let newPageNumber = 0;
        if (after) {
          newPosts = [...posts, ...newPosts];
          newPageNumber = pageNumber + 1;
        }
        return ({
          posts: newPosts,
          after: data.data.after,
          pageNumber: newPageNumber,
          page
        });
      })
      .catch(error => {
        console.error(error);
        return rejectWithValue(error.message);
      });
  }
);
