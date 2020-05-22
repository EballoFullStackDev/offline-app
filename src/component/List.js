import React, { useState, useEffect } from 'react';
import CreateTodo from './todo/create-todo';
import TodoList from './todo/todo-list';

import { DataStore } from "@aws-amplify/datastore";
import { Todo, TodoStatus } from "../models";

const List = () => {
  const [todos, setTodos] = useState([]);

  const loadTask = async () => {
  let dataStoreItems = await DataStore.query(Todo);
  let todos = dataStoreItems.map(item => {
    return {
      id:item.id,
      task:item.task
    }
  })
  setTodos(todos);
  };

  useEffect(() =>{
    loadTask();
  }, [])

  const createTodo = async (task) => {
    const newTodo = await DataStore.save(
      new Todo({
        task: task.task
      })
    )
    const todoDup = [...todos];
    todoDup.unshift({id:newTodo.id, task:newTodo.task});
    setTodos(todoDup);
  }

  const deleteTask = async (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    const todelete = await DataStore.query(Todo, id);
    DataStore.delete(todelete);

  }

  const updateTask = async (task) => {
    const newTodo = [...todos];
    const index = newTodo.findIndex(todo => todo.id === task.id); 
    newTodo[index] = task;
    setTodos(newTodo);
    const original = await DataStore.query(Todo, task.id);
    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.task = task.task;
      })
    );
    console.log(todos)
    };

  const completedTodo = async (id) => {
    const original = await DataStore.query(Todo, id);
    const model = await DataStore.save(Todo.copyOf(original, updated => {
      updated.status = TodoStatus.COMPLETED;
    }))
    updateTask({id:original.id, task:original.task, status: model.status });
  }

  return(
      <div style={container}>
        <CreateTodo createTodo={createTodo}/>
        <TodoList
          todos={todos}
          deleteTask={deleteTask}
          updateTask={updateTask}
          completedTodo={completedTodo}
        />
      </div>
  )
}

const container = { width: '100%', padding: 40, maxWidth: 900, margin: 'auto'};

export default List;