export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';
export const SEARCH_CLEAR = 'SEARCH_CLEAR';
export const SEARCH_SET = 'SEARCH_SET';
export const SEARCH_CLEAR_RESULTS = 'SEARCH_CLEAR_RESULTS';

export const searchRequest = () => ({
  type: SEARCH_REQUEST,
});

export const searchRequestSuccess = ({children, after}) => ({
  type: SEARCH_REQUEST_SUCCESS,
  posts: children,
  after,
});

export const searchRequestError = (error) => ({
  type: SEARCH_REQUEST_ERROR,
  error,
});

export const searchSet = (search) => ({
  type: SEARCH_SET,
  search,
});

export const searchClear = () => ({
  type: SEARCH_CLEAR,
});

export const searchClearResults = () => ({
  type: SEARCH_CLEAR_RESULTS,
});


