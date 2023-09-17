import {Button, Col, Form, Input, Row} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import { Todo } from '../models/Todo';
import {TodosFormsProps} from '../models/TodosFormsProps';


const TodosForm: React.FC<TodosFormsProps> = (props) => {
    const[form] = Form.useForm();
    const {onFormSubmit} = props;

    const onFinish = () => {
        const todo: Todo = {
            title: form.getFieldValue('title'),
            completed: false,
        };
        onFormSubmit(todo);
        form.resetFields();
    }

    return (
        <Form 
        form ={form}
        onFinish={onFinish}
        layout="vertical"
        className= "todo-form">
            <Row 
            gutter={20}>
                <Col xs={24} sm={24} md={17}>
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
    )
}
export default TodosForm;