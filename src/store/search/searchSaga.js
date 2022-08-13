import axios from 'axios';
import {put, takeLatest, select, call} from 'redux-saga/effects';
import {API_AUTH_URL} from '../../api/const';
import {
  searchRequestError,
  searchRequestSuccess,
  SEARCH_REQUEST
} from './searchAction';

function* fetchSearch(search) {
  const token = yield select(state => state.token.token);

  try {
    const request = yield call(axios, `${API_AUTH_URL}/search?q=${search}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    yield put(searchRequestSuccess(request.data.data));
  } catch (error) {
    yield put(searchRequestError(error.message));
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
