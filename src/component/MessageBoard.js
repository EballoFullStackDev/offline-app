import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import { Input, Button } from 'antd';
import { DataStore } from '@aws-amplify/datastore'
import { Message} from './../models';
import Moment from 'react-moment';

const initialState = { color: '#000000', title: '', }

const MessageBoard  = () => {
  const [formState, updateFormState] = useState(initialState);
  const [messages, updateMessages] = useState([]);
  const [showPicker, updateShowPicker] = useState(false);

  useEffect(() => { 
    fetchMessages()
    const subscription = DataStore.observe(Message).subscribe(() => fetchMessages());
    return () => subscription.unsubscribe();
  });

  const onChange = (e) => {
    if (e.hex) {
      updateFormState({ ...formState, color: e.hex })
    } else { updateFormState({ ...formState, title: e.target.value }) }
  };
  
  const fetchMessages = async () => {
    const messages = await DataStore.query(Message);
    //const sortedMessages = messages.sort((a,b) => a._lastChangedAt - b._lastChangedAt);
    updateMessages(messages)
  };

  const createMessage = async () => {
    if (!formState.title) return;
    await DataStore.save(new Message({ ...formState }));
    updateFormState(initialState)
  };

    return (
      <div style={container}>
        <h1 style={heading}>Real Time Message Board</h1>
        <h4>Open two browsers and see how it is in real time</h4>
        <Input
          onChange={onChange}
          name='title'
          placeholder='Message title'
          value={formState.title}
          style={input}
        />
        <div style={pickerDiv}>
        <div style={colorHex}>
          <Button onClick={() => updateShowPicker(!showPicker)}style={button}>Toggle Color Picker</Button>
          <p> Color: <span style={{fontWeight: 'bold', color: formState.color}}>{formState.color}</span></p>
        </div>
        {
          showPicker && <SketchPicker color={formState.color} onChange={onChange} />
        }
        <Button type='primary' onClick={createMessage}>Create Message</Button>
        </div>
        {
          messages.map(message => (
            <div key={message.id} style={{...messageStyle, backgroundColor: message.color}}>
              <div style={messageBg}>
                <p style={messageTitle}>{message.title}</p>
                <p style={messageDate}><Moment format="MM/DD/YYYY HH:mm">{message.createdAt}</Moment></p>
              </div>
            </div>
          ))
        }
      </div>
    )
}

//styles
const container = { width: '100%', padding: 40, maxWidth: 900, margin: 'auto'};
const input = { marginBottom: 10 };
const button = { marginBottom: 10};
const colorHex = { float: 'right', };
const pickerDiv = { marginBottom: 40, };
const heading = { fontWeight: 'normal', fontSize: 50, textAlign:'center' };
const messageBg = { backgroundColor: 'white' };
const messageStyle = { padding: '20px', marginTop: 7, borderRadius: 4 };
const messageTitle = { margin: 0, padding: 9, fontSize: 20  };
const messageDate = { margin: 0, padding: 9, fontSize: 12  };

export default MessageBoard;