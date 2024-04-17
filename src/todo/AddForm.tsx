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

    if ((lists[activeList!]?.tasks.length || 0) > 5 && type === "task") {
      alert("Too many tasks added. Please clear some tasks first.");
    }
    if ((lists?.length || 0) > 8 && type === "list") {
      alert(
        "Too many lists have been created. Please delete some lists first."
      );
    }

    if (type === "task" && (lists[activeList!]?.tasks.length || 0) <= 5) {
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
    } else if (
      type === "list" &&
      !listAlreadyExists &&
      (lists?.length || 0) <= 8
    ) {
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
        maxLength={22}
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
