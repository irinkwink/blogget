import axios from 'axios';
import {API_AUTH_URL, API_URL} from '../../api/const';

export const POSTS_DATA_REQUEST = 'POSTS_DATA_REQUEST';
export const POSTS_DATA_REQUEST_SUCCESS = 'POSTS_DATA_REQUEST_SUCCESS';
export const POSTS_DATA_REQUEST_ERROR = 'POSTS_DATA_REQUEST_ERROR';

export const postsDataRequest = () => ({
  type: POSTS_DATA_REQUEST,
  error: '',
});

export const postsDataRequestSuccess = (data) => ({
  type: POSTS_DATA_REQUEST_SUCCESS,
  data,
});

export const postsDataRequestError = (error) => ({
  type: POSTS_DATA_REQUEST_ERROR,
  error,
});

export const postsDataRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;

  let url = '';
  let options = {};

  if (token) {
    url = `${API_AUTH_URL}/best`; // https://oauth.reddit.com/best
    options = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
  } else {
    url = `${API_URL}/best`; // https://api.reddit.com/best
  }

  dispatch(postsDataRequest());

  axios(url, options)
    .then(({data: {data}}) => {
      const posts = data.children;
      dispatch(postsDataRequestSuccess(posts));
    })
    .catch(err => {
      console.error(err);
      dispatch(postsDataRequestError(err.message));
    });
};
