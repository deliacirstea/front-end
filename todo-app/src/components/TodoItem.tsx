import React from 'react';
import {Tooltip, Button, Popconfirm, Switch, message,Col, Row } from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'; 
import {TodoProps} from './models/TodoProps';
import TodoEdit from './TodoEdit';
import '../App.scss'


const Todo = ({todo, onTodoRemoval, onTodoToggle} : TodoProps ) => {

  const handleTodoRemoval = async () => {
    try {
      // Attempt to remove the todo
      await onTodoRemoval(todo);
    } catch (error) {
      console.error("Error removing todo:", error);
      message.error("An error occurred while removing the todo. Please try again later.");
    }
  };
  
    
      return (
        <div className="sticky-note-card">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={18} md={20} lg={20} xl={20}>
              <div className={`task-title ${todo.completed ? 'completed' : 'not-completed'}`}>
                {todo.text}
              </div>
            </Col>
            <Col xs={24} sm={6} md={4} lg={4} xl={4}>
              <div className="action-buttons">
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
                    handleTodoRemoval();
                    /* onTodoRemoval(todo); */
                  }}
                >
                  <Button className="remove-todo-btn" type="primary" danger>
                    X
                  </Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
        </div>
      );

}
export default Todo;