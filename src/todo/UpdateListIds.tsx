import { listType } from "./TodoApp";

function updateListIds(newLists: listType[]) {
  let counter = -1;
  const updatedLists = newLists.map((list: listType) => {
    counter += 1;
    return { listId: counter, title: list.title, tasks: list.tasks };
  });
  return updatedLists;
}

export default updateListIds;
