import axios from 'axios';
import {put, takeLatest, select, call} from 'redux-saga/effects';
import {API_AUTH_URL, API_URL} from '../../api/const';
import {
  searchRequestError,
  searchRequestSuccess,
  SEARCH_REQUEST
} from './searchAction';

function* fetchSearch() {
  const token = yield select(state => state.token.token);
  const search = yield select(state => state.search.search);
  const after = yield select(state => state.search.after);

  const searchUrl =
    `/search?q=${search}&limit=10${after ? `&after=${after}` : ''}`;

  let url = '';
  let options = {};

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


  try {
    const request = yield call(axios, url, options);
    yield put(searchRequestSuccess(request.data.data));
  } catch (error) {
    yield put(searchRequestError(error.message));
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
