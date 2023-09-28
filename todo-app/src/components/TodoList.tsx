import{Col, Layout, message, Row, Tabs } from 'antd';
import {Todo} from '../models/Todo';
import TodosForm from './TodosForm';
import {createTodo, loadTodos, deleteTodo, updateTodo} from '../services/todoServices';
import TodoTab from './TodoTab';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState, useCallback, useEffect } from 'react';

const { TabPane } = Tabs;
const { Content } = Layout; 

const TodoList = () => {
  const [refreshing, setRefreshing] = useState(false)
    /*const [todos, setTodos] = useState([]);*/

    const [activeTodos, setActiveTodos] = useState([]);
    const[completedTodos, setCompletedTodos]= useState([]);

    //acces the client
    const queryClient = useQueryClient();

    //queries
    const {isLoading, isError, data} = useQuery('todos', async () => {
        const data = await loadTodos();
        setActiveTodos(data.filter((todo: Todo) => todo.completed === false));
        setCompletedTodos (data.filter((todo : Todo) =>  todo.completed === true))
        return data
    })

    //mutations
    const  createMutation = useMutation(createTodo,{
        onSuccess: () => {
            //invalidate abnd refetch
            queryClient.invalidateQueries('todos');
            message.success('Added!');
        },
    })

    const  updateMutation = useMutation(updateTodo, {
        onSuccess: () => {
            //invalidate abnd refetch
            queryClient.invalidateQueries('todos');
            message.info('Updated');
        }
    })

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            //invalidate and refetch
            queryClient.invalidateQueries('todos');
            message.warning('Deleted!');
        },
        onError: () => {
            //error
            console.log('Error deleting todo')
        },
    })

    const handleFormSubmit = async (todo: Todo) => {
       createMutation.mutate(todo);
    } 

    const handleToggleTodoStatus = async (todo: Todo) => {
        todo.completed = !todo.completed;
        updateMutation.mutate(todo);
    }


    const handleRemoveTodo = async (todo: Todo) => {
        if (typeof todo.id !== 'undefined' && 'id' in todo){
            deleteMutation.mutate(todo.id);
        }
    }

  /*  const onRefresh = useCallback(async () => {
        setRefreshing(true);
        //await loadTodos();
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
    },[onRefresh])*/

    return (
        <Layout className="layout">
            <Content style={{padding: '10px 60px'}}>
                <div className='todolist'>
                    <Row>
                        <Col span ={15} offset={5}>
                            <h1>Todo List</h1>
                            <TodosForm onFormSubmit ={handleFormSubmit}/>
                            <br />
                            {isLoading && <div>Loading todos from the server...</div>}
                            {isError && <div>Something went wrong</div>}
                            <Tabs defaultActiveKey = "all">
                                <TabPane tab="All" key="all">
                                <TodoTab todos={data} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>

                                <TabPane tab="In Progress" key="active">
                                <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                
                                <TabPane tab="Completed" key="complete">
                                <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                
                                </Tabs>
                         </Col>
                     </Row>
                </div>
            </Content>
        </Layout>);

}
export default TodoList;