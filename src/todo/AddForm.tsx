import { useState } from "react";
import { listType, taskType } from "./TodoApp";
import React from "react";

type AddFormProps = {
  type: string;
  tasks?: taskType[];
  setTasks?: (e: any) => void;
  lists: listType[];
  setLists: (e: any) => void;
  activeList?: number;
  setActiveList?: (e: any) => void;
};

function AddForm({
  type,
  tasks,
  setTasks,
  lists,
  setLists,
  activeList,
  setActiveList,
}: AddFormProps) {
  const [newThing, setNewThing] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    let listAlreadyExists = false;

    if (lists?.length || 0) {
      for (let i = 0; i < lists!.length; i++) {
        if (lists![i].title === newThing) {
          listAlreadyExists = true;
        }
      }
    }

    if (type === "task") {
      const newTasks = [
        ...tasks!,
        {
          taskId: tasks!.length,
          text: newThing,
          checked: false,
        },
      ];
      setTasks!(newTasks);
      const newLists = lists?.map((previousList: listType) => {
        if (previousList.listId === lists[activeList!].listId) {
          return { ...previousList, tasks: newTasks };
        } else {
          return previousList;
        }
      });
      setLists!(newLists);
    } else if (type === "list" && !listAlreadyExists) {
      setLists!((previousLists: listType[]) => {
        return [
          ...previousLists,
          { listId: previousLists.length, title: newThing, tasks: [] },
        ];
      });
      setActiveList!(0);
    }
  }

  return (
    <form action="" id="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className={`new ${type} input`}
        placeholder={`new ${type}`}
        aria-label={`new ${type}`}
        onChange={(e) => {
          setNewThing(e.target.value);
        }}
      />
      <button className="btn create" aria-label={`create new ${type}`}>
        +
      </button>
    </form>
  );
}

export default AddForm;
