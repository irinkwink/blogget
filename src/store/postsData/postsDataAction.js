import axios from 'axios';
import {API_AUTH_URL, API_URL} from '../../api/const';

export const POSTS_DATA_REQUEST = 'POSTS_DATA_REQUEST';
export const POSTS_DATA_REQUEST_SUCCESS = 'POSTS_DATA_REQUEST_SUCCESS';
export const POSTS_DATA_REQUEST_SUCCESS_AFTER =
  'POSTS_DATA_REQUEST_SUCCESS_AFTER';
export const POSTS_DATA_REQUEST_ERROR = 'POSTS_DATA_REQUEST_ERROR';
export const POSTS_DATA_CLEAR = 'POSTS_DATA_CLEAR';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const postsDataRequest = () => ({
  type: POSTS_DATA_REQUEST,
  error: '',
});

export const postsDataRequestSuccess = (data) => ({
  type: POSTS_DATA_REQUEST_SUCCESS,
  posts: data.children,
  after: data.after,
});

export const postsDataRequestSuccessAfter = (data) => ({
  type: POSTS_DATA_REQUEST_SUCCESS_AFTER,
  posts: data.children,
  after: data.after,
});

export const postsDataRequestError = (error) => ({
  type: POSTS_DATA_REQUEST_ERROR,
  error,
});

export const postsDataClear = (page) => ({
  type: POSTS_DATA_CLEAR,
  page,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page,
});

export const postsDataRequestAsync = (newPage) => (dispatch, getState) => {
  let page = getState().postsData.page;
  if (newPage) {
    page = newPage;
    dispatch(changePage(page));
  }
  const token = getState().token.token;
  const after = getState().postsData.after;
  const loading = getState().postsData.loading;
  const isLast = getState().postsData.isLast;

  if (loading || isLast) return;

  let url = '';
  let options = {};

  const bestUrl = `/${page}?limit=10${after ? `&after=${after}` : ''}`;

  if (token) {
    url = `${API_AUTH_URL}${bestUrl}`; // https://oauth.reddit.com/best
    options = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
  } else {
    url = `${API_URL}${bestUrl}`; // https://api.reddit.com/best
  }

  dispatch(postsDataRequest());

  axios(url, options)
    .then(({data}) => {
      if (after) {
        dispatch(postsDataRequestSuccessAfter(data.data));
      } else {
        dispatch(postsDataRequestSuccess(data.data));
      }
    })
    .catch(err => {
      console.error(err);
      dispatch(postsDataRequestError(err.message));
    });
};
