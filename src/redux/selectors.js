export const getList = (state, listId) => state.leap.lists.find(list => list.id === listId);
export const getTask = (state, listId, taskId) => {
  const list = getList(state, listId);
  if (list) {
    return list.tasks.find(task => task.id === taskId);
  }
  return null;
};

export const selectRemoteList = (state, listId) => state.remoteList.list;
export const selectRemoteTask = (state, listId, taskId) => {
  const list = selectRemoteList(state, listId);
  if (list) {
    return list.tasks.find(task => task.id === taskId);
  }
  return null;
};
