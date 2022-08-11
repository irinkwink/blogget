import {
  CHANGE_PAGE,
  POSTS_DATA_CLEAR,
  POSTS_DATA_REQUEST,
  POSTS_DATA_REQUEST_ERROR,
  POSTS_DATA_REQUEST_SUCCESS,
  POSTS_DATA_REQUEST_SUCCESS_AFTER
} from './postsDataAction';


const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
  pageNumber: 0,
};

export const postsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POSTS_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_DATA_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.posts],
        error: '',
        after: action.after,
        isLast: !action.after,
        pageNumber: state.pageNumber + 1,
      };
    case POSTS_DATA_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case POSTS_DATA_CLEAR:
      return {
        ...initialState,
        page: action.page,
      };
    case CHANGE_PAGE:
      return {
        ...initialState,
        page: action.page,
      };
    default:
      return state;
  }
};
