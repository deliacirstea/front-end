import React, {useState} from 'react';
import {Button, Col, Form, Input, Row, message} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import { Todo } from '../models/Todo';
import {TodosFormsProps} from '../models/TodosFormsProps';
import '../App.scss';



const TodosForm: React.FC<TodosFormsProps> = (props) => {
    const[form] = Form.useForm();
    const {onFormSubmit} = props;
    const [submitting, setSubmitting] = useState(false);

    const onFinish = async () => {
        setSubmitting(true);
        try{
            const todo: Todo = {
                text: form.getFieldValue('title'),
                completed: false,
            };
            await onFormSubmit(todo);
            form.resetFields();
        } catch(error){
            console.error('Error submitting form:', error);
            message.error('An error occurred while submitting the form. Please try again later.');
        } finally {
            setSubmitting(false);
        }
        
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
                <Button type="primary" htmlType="submit" block loading={submitting}>
                    
                    <PlusCircleFilled/> 
                </Button>
                </Col>
            </Row>
        </Form>
        </div> 
       
    )

    
}
export default TodosForm;