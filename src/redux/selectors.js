export const getList = (leapState, listId) => leapState.lists.find(list => list.id === listId);
export const getTask = (leapState, listId, taskId) => {
  const list = getList(leapState, listId);
  if (list) {
    return list.tasks.find(task => task.id === taskId);
  }
  return null;
};
