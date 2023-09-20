import {List} from 'antd';
import TodoItem from './TodoItem';
import {TodosTabProps} from './models/TodosTabProps';

const TodosTab = ({todos}: TodosTabProps) => {
    return (
        <>
        <List
        locale={{ emptyText: "You got nothing left to do.",
        }}
        dataSource={todos}
        renderItem={(todo) => {
            return <TodoItem
            todo={todo}/>
        }}
        pagination={{
            position: 'bottom',
            pageSize: 10,
        }}
        />
        </>
    )
}

export default TodosTab;