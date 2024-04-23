import { useEffect } from "react";
import AddForm from "./AddForm";
import { listType, taskType } from "./TodoApp";
import { ListsProps } from "./Lists";
import updateListIds from "./UpdateListIds";
import React from "react";

function List({
  lists,
  setLists,
  tasks,
  setTasks,
  activeList,
  setActiveList,
}: ListsProps) {
  //Updates tasks whenever the list being displayed changes
  useEffect(() => {
    if (lists.length) {
      setTasks(lists[activeList].tasks);
    }
  }, [activeList]);

  function toggleChecked(e: any) {
    //Loops through tasks to find the task checked
    //If it was checked it gets unchecked and vice versa
    const newTasks = tasks?.map((task: taskType) => {
      if (task.taskId == e.target.id.substr(-1)) {
        if (task.checked === true) {
          return { ...task, checked: false };
        } else {
          return { ...task, checked: true };
        }
      } else {
        return task;
      }
    });
    updateLists(newTasks);
    setTasks(newTasks);
  }

  function handleTaskDeletion() {
    const newTasks = tasks?.filter((task: taskType) => {
      return task.checked === false;
    });
    updateLists(newTasks);
    setTasks(newTasks);
  }

  function handleListDeletion() {
    const newLists = lists?.filter((list: listType) => {
      return list.listId !== lists[activeList].listId;
    });
    // Sets lists to an array of lists where the list Id is updated to match the index of the list
    setLists(updateListIds(newLists));
    setActiveList(0);
    if (!newLists.length) {
      setTasks([]);
    } else {
      setTasks(newLists[activeList].tasks);
    }
  }

  function updateLists(newTasks: taskType[]) {
    //Updates the list to include the newly added or altered task
    const newLists = lists.map((list: listType) => {
      if (list.listId === lists[activeList].listId) {
        return {
          listId: lists[activeList].listId,
          title: lists[activeList].title,
          tasks: newTasks,
        };
      } else {
        return list;
      }
    });
    setLists(newLists);
  }

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h2 className="list-title">
          {lists.length ? lists[activeList].title : "No Lists"}
        </h2>
      </div>

      <div className="todo-body">
        <div className="tasks">
          {
            // Loops through tasks returning each task
            tasks?.map((task: taskType) => {
              return (
                <div className="task" key={task.taskId}>
                  <input
                    onChange={toggleChecked}
                    type="checkbox"
                    id={"task-" + String(task.taskId)}
                    checked={task.checked}
                  />
                  <label htmlFor={`task-${task.taskId}`}>
                    <span className="custom-checkbox"></span>
                    {task.text}
                  </label>
                </div>
              );
            })
          }
        </div>

        {
          //If there is a todo list allows you to add tasks to it
          lists.length ? (
            <div className="new-task-creator">
              <AddForm
                type={"task"}
                tasks={tasks}
                setTasks={setTasks}
                lists={lists}
                setLists={setLists}
                activeList={activeList}
              />
            </div>
          ) : (
            ""
          )
        }

        <div className="delete-stuff">
          <button onClick={handleTaskDeletion} className="btn delete">
            Clear completed tasks
          </button>
          <button onClick={handleListDeletion} className="btn delete">
            Delete list
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;
