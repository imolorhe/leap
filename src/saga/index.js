import { all, takeLatest, put, call, takeEvery, select } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import * as leapActions from '../redux/actions';
import * as leapTaskActions from '../redux/actions/task/constants';
import { getList } from '../redux/selectors';

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
    console.tron.error('Signin error: ' + JSON.stringify(err.message));
  }
}

export function* logoutUser() {
  try {
    const signout = yield call(() => firebase.auth().signOut());
    yield call(checkAuth);
  } catch (err) {
    console.tron.error('Signout error: ' + JSON.stringify(err.message));
  }
}

export function* fetchUserLists() {
  try {
    const uid = firebase.auth().currentUser.uid;
    if (!uid) {
      throw new Error('User is not authenticated.');
    }
    const snapshot = yield firebase.database().ref().child(`/user-lists/${uid}`).once('value');

    const lists = Object.values(snapshot.val());
    console.tron.log(JSON.stringify(lists));

    yield put({ type: leapActions.FETCH_USER_LISTS_SUCCESS, payload: { lists } });
  } catch (err) {
    console.tron.error('Fetch remote list Error: ' + JSON.stringify(err.message));
    yield put({ type: leapActions.FETCH_USER_LISTS_FAILURE })
  }
}

export function* addList(action) {
  try {
    const uid = firebase.auth().currentUser.uid;
    if (!uid) {
      throw new Error('User is not authenticated.');
    }
    const newListKey = firebase.database().ref().child('lists').push().key;

    const updates = {};
    updates['/lists/' + newListKey] = action.payload.list;
    updates['/user-lists/' + uid + '/' + newListKey] = action.payload.list;

    firebase.database().ref().update(updates);

  } catch (err) {
    console.tron.error('Add list Error: ' + JSON.stringify(err.message));
  }
}

export function* deleteList(action) {
  try {
    const uid = firebase.auth().currentUser.uid;

    if (!uid) {
      throw new Error('User is not authenticated.');
    }
    const snapshot = yield firebase.database().ref().child(`/user-lists/${uid}`).orderByChild('id').equalTo(action.payload.list_id).once('value');

    let listKey = null;
    snapshot.forEach(data => listKey = data.key);

    const updates = {};
    updates['/lists/' + listKey] = null;
    updates['/user-lists/' + uid + '/' + listKey] = null;

    firebase.database().ref().update(updates);
  } catch (err) {
    console.tron.error('Delete list Error: ' + JSON.stringify(err.message));
  }
}

export function* updateList(action) {
  try {
    const listData = yield select(getList, action.payload.list_id);
    const uid = firebase.auth().currentUser.uid;

    if (!uid) {
      throw new Error('User is not authenticated.');
    }
    const snapshot = yield firebase.database().ref().child(`/user-lists/${uid}`).orderByChild('id').equalTo(action.payload.list_id).once('value');

    let listKey = null;
    snapshot.forEach(data => listKey = data.key);

    const updates = {};
    updates['/lists/' + listKey] = listData;
    updates['/user-lists/' + uid + '/' + listKey] = listData;

    firebase.database().ref().update(updates);
  } catch (err) {
    console.tron.error('Update list Error: ' + JSON.stringify(err.message));
  }
}

export function* fetchRemoteList(action) {
  try {
    const snapshot = yield firebase.database().ref().child(`/lists`).orderByChild('id').equalTo(action.payload.list_id).once('value');

    const list = Object.values(snapshot.val())[0];
    console.tron.log(JSON.stringify(list));

    yield put({ type: leapActions.REMOTE_GET_LIST_SUCCESS, payload: { list } });
  } catch (err) {
    console.tron.error('Fetch remote list Error: ' + JSON.stringify(err.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(leapActions.GET_API_CALL, leapApiCall),
    takeLatest(leapActions.AUTH_CHECK_AUTH, checkAuth),
    takeLatest(leapActions.AUTH_LOGOUT, logoutUser),
    takeLatest(leapActions.AUTH_LOGIN, loginUser),
    takeLatest(leapActions.AUTH_CREATE_ACCOUNT, createAccount),
    takeEvery(leapActions.ADD_LIST, addList),
    takeEvery(leapActions.REMOVE_LIST, deleteList),
    takeLatest([
      leapActions.LIST_CHANGE_TITLE,
      ...Object.values(leapTaskActions)
    ], updateList),
    takeLatest(leapActions.REMOTE_GET_LIST, fetchRemoteList),
    takeLatest(leapActions.FETCH_USER_LISTS, fetchUserLists),
  ]);
}
