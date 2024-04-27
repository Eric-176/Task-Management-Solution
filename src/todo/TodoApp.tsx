import React from "react";
import List from "./List.tsx";
import Lists from "./Lists.tsx";
import "./TodoApp.css";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "Planexe.todo";

export type taskType = {
  taskId: number;
  text: string;
  checked: boolean;
};

export type listType = {
  listId: number;
  title: string;
  tasks: taskType[];
};

export default function App() {
  const [activeList, setActiveList] = useState(0);
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [lists, setLists] = useState<listType[]>([]);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const storedLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
      if (storedLists?.length) {
        setLists(storedLists);
        setTasks(storedLists[0].tasks);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
  }, [lists, tasks]);

  return (
    <div className="TodoAppBody">
      <div className="TodoApp">
        <Lists
          lists={lists}
          setLists={setLists}
          tasks={tasks}
          setTasks={setTasks}
          activeList={activeList}
          setActiveList={setActiveList}
        />
        <List
          lists={lists}
          setLists={setLists}
          tasks={tasks}
          setTasks={setTasks}
          activeList={activeList}
          setActiveList={setActiveList}
        />
      </div>
    </div>
  );
}
