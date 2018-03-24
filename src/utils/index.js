const uuidv4 = require('uuid/v4');

export const generateListId = () => `l${uuidv4()}`;
export const generateTaskId = () => `t${uuidv4()}`;
export const generateTaskImageId = () => `ti${uuidv4()}`;

export const createAction = type => payload => ({ type, payload });
