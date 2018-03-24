import { REMOTE_GET_LIST, REMOTE_GET_LIST_SUCCESS, REMOTE_GET_LIST_FAILURE } from "../actions";

const INITIAL_STATE = {
  loading: false,
  list: null
};

export const remoteListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMOTE_GET_LIST:
      return {
        ...state,
        loading: true
      };
    case REMOTE_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.list
      };
    case REMOTE_GET_LIST_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
