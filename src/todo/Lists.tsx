import AddForm from "./AddForm";
import { listType, taskType } from "./TodoApp";
import SaveAndImport from "./SaveAndImport";
import React from "react";

export type ListsProps = {
  lists: listType[];
  setLists: (e: any) => void;
  tasks: taskType[];
  setTasks: (e: any) => void;
  activeList: number;
  setActiveList: (e: any) => void;
};

function Lists({
  lists,
  setLists,
  setTasks,
  activeList,
  setActiveList,
}: ListsProps) {
  function handleActive(e: any) {
    if (lists.length && e.target.innerHTML !== lists[activeList].title) {
      setTasks(lists[activeList].tasks);
      for (let i = 0; i < lists.length; i++) {
        if (
          !(lists[activeList].title === e.target.innerHTML) &&
          lists[i].title === e.target.innerHTML
        ) {
          setActiveList(i);
        }
      }
    }
  }
  return (
    <div className="all-tasks">
      <h2 className="task-list-title">My lists</h2>
      <ul className="task-list">
        {lists?.map((list: listType) => {
          if (list === lists[activeList]) {
            return (
              <li
                key={list.listId}
                className="list active-list"
                onClick={handleActive}
              >
                {list.title}
              </li>
            );
          } else {
            return (
              <li key={list.listId} className="list" onClick={handleActive}>
                {list.title}
              </li>
            );
          }
        })}
      </ul>
      <AddForm
        type={"list"}
        setTasks={setTasks}
        lists={lists}
        setLists={setLists}
        setActiveList={setActiveList}
      />
      <SaveAndImport
        lists={lists}
        setLists={setLists}
        activeList={activeList}
      />
    </div>
  );
}

export default Lists;
