import React from "react";

type TaskProps = {
  id: string;
  title: string;
};

function Task({ id, title }: TaskProps) {
  return (
    <div className="task">
      <input type="checkbox" id={id} />
      <label htmlFor={id}>
        <span className="custom-checkbox"></span>
        {title}
      </label>
    </div>
  );
}

export default Task;
