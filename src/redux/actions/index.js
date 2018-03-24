import { createAction } from '../../utils';

export * from './task';

export const ADD_ELEMENT = 'ADD_ELEMENT';
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT';

export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const LIST_CHANGE_TITLE = 'LIST_CHANGE_TITLE';

export const GET_API_CALL = 'GET_API_CALL';
export const GET_API_CALL_SUCCESS = 'GET_API_CALL_SUCCESS';
export const GET_API_CALL_FAILURE = 'GET_API_CALL_FAILURE';

export const AUTH_CHECK_AUTH = 'AUTH_CHECK_AUTH';
export const AUTH_CHECK_AUTH_SUCCESS = 'AUTH_CHECK_AUTH_SUCCESS';
export const AUTH_CHECK_AUTH_FAILURE = 'AUTH_CHECK_AUTH_FAILURE';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CREATE_ACCOUNT = 'AUTH_CREATE_ACCOUNT';

export const NAVIGATE_TO_CONTENT = 'NAVIGATE_TO_CONTENT';

export const REMOTE_GET_LIST = 'REMOTE_GET_LIST';
export const REMOTE_GET_LIST_SUCCESS = 'REMOTE_GET_LIST_SUCCESS';
export const REMOTE_GET_LIST_FAILURE = 'REMOTE_GET_LIST_FAILURE';

export const addElement = createAction(ADD_ELEMENT);
export const removeElement = createAction(REMOVE_ELEMENT);

export const addList = createAction(ADD_LIST);
export const removeList = createAction(REMOVE_LIST);
export const changeListTitle = createAction(LIST_CHANGE_TITLE);


export const getApiCall = createAction(GET_API_CALL);

export const checkAuth = createAction(AUTH_CHECK_AUTH);
export const loginUser = createAction(AUTH_LOGIN);
export const logoutUser = createAction(AUTH_LOGOUT);
export const createAccount = createAction(AUTH_CREATE_ACCOUNT);

export const goToContent = createAction(NAVIGATE_TO_CONTENT);

export const getRemoteList = createAction(REMOTE_GET_LIST);
