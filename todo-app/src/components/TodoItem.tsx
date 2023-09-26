import React, { useEffect } from 'react';
import {Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import {TodoProps} from './models/TodoProps';

const Todo = ({todo} : TodoProps) => {


    return(
        <List.Item
        className='list-item'
        key={todo.id}
        >
            <div className="todo-item">
                <Tag color={todo.completed ? 'green ': 'red'} className='todo-tag'>{todo.title || 'No Title'}
                </Tag>
            </div>
        </List.Item>
    )
}
export default Todo;