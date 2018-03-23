import { all, takeLatest, put, call } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
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

export function* checkAuth() {
  const checkFBAuth = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        resolve(user);
      } else {
        // No user is signed in.
        reject('No user!');
      }
    });
  });

  try {
    const user = yield checkFBAuth;

    yield put({ type: leapActions.AUTH_CHECK_AUTH_SUCCESS, payload: user });
  } catch (err) {
    yield put({ type: leapActions.AUTH_CHECK_AUTH_FAILURE });
  }
}

export function* createAccount(action) {
  const { email, password } = action.payload;
  try {
    const user = yield call(() => firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password));

    yield call(checkAuth);
  } catch (err) {
    console.tron.log('Signup error: ' + JSON.stringify(err.message));
  }
}

export function* loginUser(action) {
  const { email, password } = action.payload;
  try {
    // console.tron.log(email);
    const credentials = yield call(() => firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password));

    if (credentials) {
      console.tron.log(JSON.stringify(credentials.user.toJSON()));
      yield call(checkAuth);
    }
  } catch (err) {
    console.tron.log('Signin error: ' + JSON.stringify(err.message));
  }
}

export function* logoutUser() {
  try {
    const signout = yield call(() => firebase.auth().signOut());
    yield call(checkAuth);
  } catch (err) {
    console.tron.log('Signout error: ' + JSON.stringify(err.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(leapActions.GET_API_CALL, leapApiCall),
    takeLatest(leapActions.AUTH_CHECK_AUTH, checkAuth),
    takeLatest(leapActions.AUTH_LOGOUT, logoutUser),
    takeLatest(leapActions.AUTH_LOGIN, loginUser),
    takeLatest(leapActions.AUTH_CREATE_ACCOUNT, createAccount),
  ]);
}
