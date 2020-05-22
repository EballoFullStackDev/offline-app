import React from "react";
import TodoListItem from "./todo-list-item";
import TodoListHeader from "./todo-list-header";

const TodoList = (props) => {
  return (
    <div style={container}>
    <table>
      <TodoListHeader />
      <tbody>
        {props.todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} deleteTask={props.deleteTask} updateTask={props.updateTask} completedTodo={props.completedTodo}/>
        ))}
      </tbody>
    </table>
    </div>
  );
};

const container = { width: '100%', padding: 40, paddingTop:0, maxWidth: 900, margin: 'auto'};

export default TodoList;
