import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button } from 'antd';

const CreateTodo = (props) => {
  const [input, setInput] = useState(''); 

    const handleCreate = () => {
      if (input.length) {
        const data = {id: uuidv4(), task: input};
        props.createTodo(data);
        setInput('');
      }
    };

    const onChangeHandler = (e) => {
      const data = e.target.value;
      setInput(data);
    };

    const onEnter = (e) => {
      if(e.key === 'Enter')
      handleCreate();
    };
  
      return (
        <div style={container}>
        <h1>List using AWS Datastore</h1>
              <Input style={inputStyle} size='large' type="text" onKeyDown={onEnter} placeholder="Type your task here" onChange={onChangeHandler} value={input} />
              <Button block type='primary' size='large' style={button} onClick={handleCreate}>+ Add Item</Button>
        </div>
      );
};

const container = { width: '100%', padding: 40, maxWidth: 900, margin: 'auto'};
const inputStyle = { marginBottom: 10 };
const button = { marginBottom: 10 };
 
export default CreateTodo;