export const getList = (state, listId) => state.leap.lists.find(list => list.id === listId);
export const getTask = (state, listId, taskId) => {
  const list = getList(state, listId);
  if (list) {
    return list.tasks.find(task => task.id === taskId);
  }
  return null;
};
