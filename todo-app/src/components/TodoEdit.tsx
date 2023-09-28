import React, {useState} from 'react';
import {Input, Button, Form, message, Modal } from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {updateTodo} from '../services/todoServices';
import {Todo} from "../models/Todo";
import {useQueryClient} from "react-query";

const TodoEdit = (todo : Todo) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        const editedTodo: Todo = {
            id: todo.id,
            text: form.getFieldValue('title'),
            completed: todo.completed,
        };
        if (editedTodo.text != null){
            await updateTodo(editedTodo);
            queryClient.invalidateQueries('todos');
        }
        else {
            message.warning("Your todo is not updated.");
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <Button onClick={showModal}>
            <EditOutlined/> 
        </Button>
        <Modal title="Edit" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form 
        form={form}
        initialValues={todo}>
        <Form.Item name={'title'}>
        <Input value={todo.text}/>
        </Form.Item>
        </Form>
        </Modal>
        </>
    );
        
}

export default TodoEdit;