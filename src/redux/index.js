import { combineReducers } from 'redux';

import rootSaga from '../saga';
import configureStore from './configureStore';

import { generateListId, generateTaskId } from '../utils';

import {
  ADD_LIST,
  REMOVE_LIST,
  LIST_CHANGE_TITLE,

  ADD_TASK,
  REMOVE_TASK,
  TASK_CHANGE_TITLE,
  TASK_SET_CONTACTS,

  GET_API_CALL,
  GET_API_CALL_SUCCESS,
  GET_API_CALL_FAILURE
} from './actions';

export const INITIAL_TASK_STATE = {
  id: '',
  title: '',
  description: '',
  completed: false,
  imageUrls: [],
  people: []
};
export const INITIAL_LIST_STATE = {
  id: '',
  title: '',
  tasks: []
};
export const INITIAL_STATE = {
  posts: [],
  postCount: 0,

  lists: []
};

export const getInitialListState = () => ({...INITIAL_LIST_STATE, id: generateListId() });
export const getInitialTaskState = () => ({ ...INITIAL_TASK_STATE, id: generateTaskId() });

export const leapReducer = (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch(action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [ ...state.lists, payload.list ]
      };
    case REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== payload.list_id)
      };
    case LIST_CHANGE_TITLE:
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === payload.list_id) {
            list.title = payload.text;
          }
          return list;
        })
      };
    case ADD_TASK:
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === payload.list_id) {
            list.tasks = [ ...list.tasks, payload.task ];
          }
          return list;
        })
      };
    case REMOVE_TASK:
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === payload.list_id) {
            list.tasks = list.tasks.filter(task => task.id !== payload.task_id);
          }
          return list;
        })
      };
    case TASK_CHANGE_TITLE:
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === payload.list_id) {
            list.tasks = list.tasks.map(task => {
              if (task.id === payload.task_id) {
                task.title = payload.text;
              }
              return task;
            })
          }
          return list;
        })
      };
    case TASK_SET_CONTACTS:
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === payload.list_id) {
            list.tasks = list.tasks.map(task => {
              if (task.id === payload.task_id) {
                task.people = payload.contacts;
              }
              return task;
            })
          }
          return list;
        })
      };
    case GET_API_CALL_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        postCount: action.payload.length
      };
    default:
      return state;
  }
};

export const appReducer = combineReducers({
  leap: leapReducer
});

export default configureStore(appReducer, rootSaga);
