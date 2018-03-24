import { createAction } from "../../../utils";
import * as constants from './constants';

export * from './constants';

export const addTask = createAction(constants.ADD_TASK);
export const removeTask = createAction(constants.REMOVE_TASK);
export const completeTask = createAction(constants.COMPLETE_TASK);
export const uncompleteTask = createAction(constants.UNCOMPLETE_TASK);
export const changeTaskTitle = createAction(constants.TASK_CHANGE_TITLE);
export const setTaskContacts = createAction(constants.TASK_SET_CONTACTS);
export const addTaskImage = createAction(constants.TASK_ADD_IMAGE);
export const removeTaskImage = createAction(constants.TASK_REMOVE_IMAGE);
export const setTaskDescription = createAction(constants.TASK_SET_DESCRIPTION);
