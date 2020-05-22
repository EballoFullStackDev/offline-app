import React, { useState } from "react";
import { Input, Button } from "antd";
import { TodoStatus } from "../../models";

const TodoListItem = (props) => {
  const [task, setTask] = useState(props.todo.task);
  const [isEditing, setIsEditing] = useState(false);
  const  id  = props.todo.id;

  const onSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    props.updateTask({id, task:task});
  };

  const updateTask = () => {
    setIsEditing(true);
  };

  const changeTask = (e) => {
    setTask(e.target.value);

  };

  const cancelClick = () => {
    setIsEditing(false);
  };

  const deleteTask = () => {
    props.deleteTask(id);
  }

  const onEnter = (e) => {
    if(e.key === 'Enter')
    onSaveClick(e);
  };

  const onCompleteTodoClick = (e) => {
    props.completedTodo(id);
  }

  const taskSection = () => {
    const { status } = props;
    const taskStyle = {
      color: status === TodoStatus.COMPLETED ? "#2ecc71" : "#d35400",
      textDecoration: status === TodoStatus.COMPLETED ? "line-through" : "",
      fontSize: "20px",
      cursor: "pointer",
      paddingLeft: 20,
    };
    const section = { width: "100%" };
    if (isEditing) {
      return (
        <td style={section}>
            <Input size="large" onChange={changeTask} onKeyDown={onEnter} value={task} />
        </td>
      );
    }
    return (
      <td style={taskStyle} onClick={onCompleteTodoClick}>
        {task}
      </td>
    );
  };

  const actionSection = () => {
    const style = {
      marginRight: "5px",
      width: "75px",
    };
    if (isEditing) {
      return (
        <td style={row}>
          <Button style={style} type="primary" onClick={onSaveClick}>
            Update
          </Button>
          <Button style={style} type="danger" onClick={cancelClick}>
            Cancel
          </Button>
        </td>
      );
    }
    return (
      <td style={row}>
        <Button
          style={style}
          type="primary"
          onClick={updateTask}
        >
          {" "}
          Edit{" "}
        </Button>
        <Button
          style={style}
          type="danger"
          onClick={deleteTask}
        >
          {" "}
          Delete{" "}
        </Button>
      </td>
    );
  };

  return (
    <tr style={taskSectionArea}>
      {taskSection()}
      {actionSection(task)}
    </tr>
  );
};

const taskSectionArea = {};
const row = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  marginTop: 5,
  marginLeft: 10,
};

export default TodoListItem;
