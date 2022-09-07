import {
  SEARCH_CLEAR,
  SEARCH_CLEAR_RESULTS,
  SEARCH_REQUEST,
  SEARCH_REQUEST_ERROR,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_SET
} from './searchAction';

const initialState = {
  search: '',
  loading: false,
  posts: [],
  error: '',
  after: '',
  pageNumber: -1,
  isLast: false,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.posts],
        error: '',
        pageNumber: state.pageNumber + 1,
        after: action.after,
        isLast: !action.after,
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SEARCH_SET:
      return {
        ...state,
        search: action.search,
      };
    case SEARCH_CLEAR:
      return {
        ...initialState,
      };
    case SEARCH_CLEAR_RESULTS:
      return {
        ...state,
        loading: false,
        posts: [],
        error: '',
        after: '',
        pageNumber: -1,
        isLast: false,
      };
    default:
      return state;
  }
};
