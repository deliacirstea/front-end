import React, { useEffect } from 'react';
import {Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'; 
import {TodoProps} from './models/TodoProps';

const Todo = ({todo, onTodoRemoval} : TodoProps ) => {

    return(
        <List.Item
       actions={[
        <Tooltip>
        <Switch
        checkedChildren={<CheckOutlined/>}
        unCheckedChildren={<CloseOutlined />} 
        />
        </Tooltip>,
        <Popconfirm title="Are you sure?"
        onConfirm={() =>{
            onTodoRemoval(todo);
        }}>
            <Button className='remove-todo-btn' type="primary" danger>X</Button>
        </Popconfirm>
        
    ]}
        className ="list-item"
        key={todo.id}>
            <div
            className='todo-item'>
                <Tag color={todo.completed ? 'green' : 'red'} className='todo-tag'>{todo.text}
                </Tag>
            </div>

            
        </List.Item>
    )
}
export default Todo;