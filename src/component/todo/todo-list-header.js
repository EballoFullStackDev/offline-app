import React from 'react';

export default class TodoListHeader extends React.Component {
    render(){
        return (
            <thead style={wrapper}>
                <tr style={row}>
                    <th style={task}>Task</th>
                    <th style={action}>Action</th>
                </tr>
            </thead>
        );
    }
}

const wrapper = { width: '100%', padding: 40, maxWidth: 900, margin: 'auto', marginTop:0, backgroundColor: 'lightgrey'}; 
const row = {textAlign:'center', display:'grid', gridTemplateColumns:'2fr 1fr', paddingLeft:40 };
const task = {width:200};
const action = {width:450}; 