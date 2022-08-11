import axios from 'axios';
import {API_URL} from '../../api/const';

export const COMMENTS_DATA_REQUEST = 'COMMENTS_DATA_REQUEST';
export const COMMENTS_DATA_REQUEST_SUCCESS = 'COMMENTS_DATA_REQUEST_SUCCESS';
export const COMMENTS_DATA_REQUEST_ERROR = 'COMMENTS_DATA_REQUEST_ERROR';

export const commentsDataRequest = () => ({
  type: COMMENTS_DATA_REQUEST,
  error: '',
});

export const commentsDataRequestSuccess = (data) => ({
  type: COMMENTS_DATA_REQUEST_SUCCESS,
  data,
});

export const commentsDataRequestError = (error) => ({
  type: COMMENTS_DATA_REQUEST_ERROR,
  error,
});

export const commentsDataRequestAsync = (id) => (dispatch) => {
  dispatch(commentsDataRequest());

  axios(`${API_URL}/comments/${id}`)
    .then(({data}) => {
      const post = data[0].data.children[0].data;
      const comments = data[1].data.children;
      dispatch(commentsDataRequestSuccess({post, comments}));
    })
    .catch(err => {
      console.error(err);
      dispatch(commentsDataRequestError(err.message));
    });
};
