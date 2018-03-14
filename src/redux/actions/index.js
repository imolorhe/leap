export const ADD_ELEMENT = 'ADD_ELEMENT';
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT';

export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

export const GET_API_CALL = 'GET_API_CALL';
export const GET_API_CALL_SUCCESS = 'GET_API_CALL_SUCCESS';
export const GET_API_CALL_FAILURE = 'GET_API_CALL_FAILURE';

export const createAction = type => payload => ({ type, payload });

export const addElement = createAction(ADD_ELEMENT);
export const removeElement = createAction(REMOVE_ELEMENT);

export const addList = createAction(ADD_LIST);
export const removeList = createAction(REMOVE_LIST);

export const addTask = createAction(ADD_TASK);
export const removeTask = createAction(REMOVE_TASK);

export const getApiCall = createAction(GET_API_CALL);