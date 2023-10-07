import React from 'react';
import {Tooltip, Button, Popconfirm, Switch } from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'; 
import {TodoProps} from './models/TodoProps';
import TodoEdit from './TodoEdit';
import '../App.scss'


const Todo = ({todo, onTodoRemoval, onTodoToggle} : TodoProps ) => {

       return (
        <div className="sticky-note-card"> 
            <div className={`task-title ${todo.completed ? 'completed' : 'not-completed'}`}>
            {todo.text}
             </div>

          <div className="action-buttons left-buttons">
            <Tooltip title={todo.completed ? 'Mark as not completed' : 'Mark as completed'}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={() => onTodoToggle(todo)}
                defaultChecked={todo.completed}
              />
            </Tooltip>
            <TodoEdit id={todo.id} text={todo.text} completed={todo.completed} />
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                onTodoRemoval(todo);
              }}
            >
              <Button className="remove-todo-btn" type="primary" danger>
                X
              </Button>
            </Popconfirm>
          </div>
         
        </div>
      );   
    
}
export default Todo;