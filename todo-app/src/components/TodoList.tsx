import{Col, Layout, message, Row, Tabs } from 'antd';
import {Todo} from '../models/Todo';
import TodosForm from './TodosForm';
import {createTodo, loadTodos, deleteTodo, updateTodo} from '../services/todoServices';
import TodoTab from './TodoTab';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState, useCallback, useEffect } from 'react';
import '../App.scss';


const { TabPane } = Tabs;
const { Content } = Layout; 

const TodoList = () => {
  const [refreshing, setRefreshing] = useState(false)
    

    const [activeTodos, setActiveTodos] = useState([]);
    const[completedTodos, setCompletedTodos]= useState([]);

    

    //acces the client
    const queryClient = useQueryClient();

    //queries
    const {isLoading, isError, data} = useQuery('todos', async () => {
        try{
            const data = await loadTodos();
            setActiveTodos(data.filter((todo: Todo) => todo.completed === false));
            setCompletedTodos (data.filter((todo : Todo) =>  todo.completed === true))
            return data;
        } catch(error){
            throw new Error('Failed to load todos');
        }
       
    })

    //mutations
    const  createMutation = useMutation(createTodo,{
        onSuccess: () => {
            //invalidate abnd refetch
            queryClient.invalidateQueries('todos');
            message.success('Added!');
        },
        onError: (error) => {
            console.error('Error creating todo:', error);
            message.error('An error occurred while adding the todo. Please try again later.');
        },
    })

    const  updateMutation = useMutation(updateTodo, {
        onSuccess: () => {
            //invalidate abnd refetch
            queryClient.invalidateQueries('todos');
            message.info('Updated');
        },
        onError: (error) => {
            console.error('Error updating todo:', error);
            message.error('An error occurred while updating the todo. Please try again later.');
        },
    })

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            //invalidate and refetch
            queryClient.invalidateQueries('todos');
            message.warning('Deleted!');
        },
        onError: (error) => {
            console.error('Error deleting todo:', error);
            message.error('An error occurred while deleting the todo. Please try again later.');
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

    return (
          
            <Content style={{padding: '100px 200px 100px'}}>
                <div className='layout'>
                    <Row>
                        <Col span ={15} offset={5}>
                            <h1 className='header'>Todo List</h1>
                            <div className='todo-form'>
                            <TodosForm onFormSubmit ={handleFormSubmit}/>
                            </div>
                            
                            {isLoading && <div>Loading todos from the server...</div>}
                            {isError && <div>Something went wrong</div>}
                            
                                <Tabs className='todo-progress'  defaultActiveKey = "all">
                                <TabPane tab="All" key="all">
                                <TodoTab todos={data} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>

                                <TabPane className='todo-progress' tab="Ongoing" key="active">
                                <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                
                                <TabPane className='todo-progress' tab="Done" key="complete">
                                <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                <br/>
                                </Tabs>
                                <br/>
                           
                            
                         </Col>
                     </Row>
                </div>
            </Content>
         

       
        
        
        
        ); 
}
export default TodoList;