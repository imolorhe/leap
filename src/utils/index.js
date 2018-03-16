const uuidv4 = require('uuid/v4');

export const generateListId = () => `l${uuidv4()}`;
export const generateTaskId = () => `t${uuidv4()}`;