import { MainNavigator } from '../../navigators';

import { NAVIGATE_TO_CONTENT, AUTH_CHECK_AUTH_SUCCESS, AUTH_CHECK_AUTH_FAILURE } from '../actions';

const initialNavState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('AuthLoading'));

export const navReducer = (state = initialNavState, action) => {
  let nextState = MainNavigator.router.getStateForAction(action, state);

  switch (action.type) {
    case NAVIGATE_TO_CONTENT:
    case AUTH_CHECK_AUTH_SUCCESS:
      nextState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('Content'), state);
      break;
    case AUTH_CHECK_AUTH_FAILURE:
      nextState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('Auth'), state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
