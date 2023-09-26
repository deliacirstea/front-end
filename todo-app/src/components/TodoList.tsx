import{Col, Layout, message, Row, Tabs } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {Todo} from '../models/Todo';
import TodosForm from './TodosForm';
import {createTodo, loadTodos} from '../services/todoServices';
import TodoTab from './TodoTab';

const { TabPane } = Tabs;
const { Content } = Layout; 

const TodoList: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);

    const handleFormSubmit = async (todo: Todo) => {
        await createTodo(todo);
        onRefresh();
        message.success('Your Todo has been added!');
    } 

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
            refresh()
        setRefreshing(false);
    },[refreshing]);

    const refresh = async () => {
        const result = await loadTodos();
       setTodos(result);
       console.log(todos);
    }
    
    useEffect(() => {
        refresh();
    },[onRefresh])

    return (
        <Layout className="layout">
            <Content style={{padding: '10px 60px'}}>
                <div className='todolist'>
                    <Row>
                        <Col span ={15} offset={5}>
                            <h1>Todo List</h1>
                            <TodosForm onFormSubmit ={handleFormSubmit}/>
                            <br />
                            <Tabs defaultActiveKey = "all">
                                <TabPane tab="All" key="all">
                                <TodoTab todos={todos}></TodoTab>

                                </TabPane>
                                
                                </Tabs><br /><br />
                         </Col>
                     </Row>
                </div>
            </Content>
        </Layout>);

}
export default TodoList;