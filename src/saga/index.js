import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as leapActions from '../redux/actions';

export function* leapApiCall() {
  try {
    const response = yield call(() => fetch('https://jsonplaceholder.typicode.com/posts'));
    const data = yield call(() => response.json());

    yield put({ type: leapActions.GET_API_CALL_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: leapActions.GET_API_CALL_FAILURE });
  }
}

export default function* root() {
  yield all([
    takeLatest(leapActions.GET_API_CALL, leapApiCall)
  ]);
}