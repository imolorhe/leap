import { createAction } from "../../utils";

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const UNCOMPLETE_TASK = 'UNCOMPLETE_TASK';
export const TASK_CHANGE_TITLE = 'TASK_CHANGE_TITLE';
export const TASK_SET_CONTACTS = 'TASK_SET_CONTACTS';
export const TASK_ADD_IMAGE = 'TASK_ADD_IMAGE';
export const TASK_REMOVE_IMAGE = 'TASK_REMOVE_IMAGE';
export const TASK_SET_DESCRIPTION = 'TASK_SET_DESCRIPTION';

export const addTask = createAction(ADD_TASK);
export const removeTask = createAction(REMOVE_TASK);
export const completeTask = createAction(COMPLETE_TASK);
export const uncompleteTask = createAction(UNCOMPLETE_TASK);
export const changeTaskTitle = createAction(TASK_CHANGE_TITLE);
export const setTaskContacts = createAction(TASK_SET_CONTACTS);
export const addTaskImage = createAction(TASK_ADD_IMAGE);
export const removeTaskImage = createAction(TASK_REMOVE_IMAGE);
export const setTaskDescription = createAction(TASK_SET_DESCRIPTION);
