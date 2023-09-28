import {Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'; 
import {TodoProps} from './models/TodoProps';
import TodoEdit from './TodoEdit';


const Todo = ({todo, onTodoRemoval, onTodoToggle} : TodoProps ) => {

    return(
        <List.Item
       actions={[
        <Tooltip title={todo.completed ? 'Mark as not completed' : 'Mark as completed'}>
        <Switch
        checkedChildren={<CheckOutlined/>}
        unCheckedChildren={<CloseOutlined />} 
        onChange={() => onTodoToggle(todo)}
        defaultChecked={todo.completed}

        />
        </Tooltip>,
      <TodoEdit id={todo.id} text={todo.text} completed={todo.completed} />,

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