import React from 'react';
import {Button, Col, Form, Input, Row} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import { Todo } from '../models/Todo';
import {TodosFormsProps} from '../models/TodosFormsProps';
import '../App.scss';
import '../styles/TodosForm.scss';


const TodosForm: React.FC<TodosFormsProps> = (props) => {
    const[form] = Form.useForm();
    const {onFormSubmit} = props;

    const onFinish = () => {
        const todo: Todo = {
            text: form.getFieldValue('title'),
            completed: false,
        };
        onFormSubmit(todo);
        form.resetFields();
    }
    
    return (
        <div className='todo-header '>
        <Form 
        form ={form}
        onFinish={onFinish}
        layout="horizontal"
        className= "todo-form">
            <Row 
            gutter={20}>
                <Col xs={24} sm={24} md={21} lg={19} xl={20}>
                    <Form.Item 
                    name ="title"
                    rules = {[{required: true, message: 'Please enter a title'}]}>
                  <Input placeholder = "What do you need to do?" ></Input>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}> 
                <Button type="primary" htmlType="submit" block>
                    <PlusCircleFilled/>
                </Button>
                </Col>
            </Row>
        </Form>
        </div> 
       /*  <div className='header text-center'>
            <h3>Chore list</h3>
            <Form
            form ={form}
            onFinish={onFinish}
            className='todo-form'>
                <Form.Item
                name ="title"
                rules ={[{required: true, message: 'Please add a task'}]}>
                    <Input placeholder='What chores do you wanna chuckle today?'></Input>
                </Form.Item>
                <Button type='primary' htmlType='submit' block><PlusCircleFilled/></Button>
            </Form>
        </div> */


    )

    
}
export default TodosForm;