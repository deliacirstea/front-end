import {List} from 'antd';
import TodoItem from './TodoItem';
import {TodosTabProps} from './models/TodosTabProps';
import '../styles/TodosForm.scss';

const TodosTab = ({todos, onTodoToggle, onTodoRemoval}: TodosTabProps) => {
    return (
        <>
        <List
        locale={{ emptyText: "You got nothing left to do.",
        }}
        dataSource={todos}
        renderItem={(todo) => {
            return <TodoItem
            todo={todo}
            onTodoToggle={onTodoToggle}
            onTodoRemoval ={onTodoRemoval}
            />
        }}
        pagination={{
            position: 'bottom',
            pageSize: 5,
        }}
        />
        </>
    )
}

export default TodosTab;