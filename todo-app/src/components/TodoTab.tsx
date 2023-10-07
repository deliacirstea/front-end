import {List} from 'antd';
import TodoItem from './TodoItem';
import {TodosTabProps} from './models/TodosTabProps';
import '../styles/TodosForm.scss';


const TodosTab = ({todos, onTodoToggle, onTodoRemoval}: TodosTabProps) => {
    if (!todos || !Array.isArray(todos)) {
        return <div className="error-message">Error: Failed to load todos. Please check your internet connection or try again later.</div>;
    }

    if (typeof onTodoToggle !== 'function' || typeof onTodoRemoval !== 'function') {
        return <div className="error-message">Error: 'onTodoToggle' and 'onTodoRemoval' must be functions</div>;
    }

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