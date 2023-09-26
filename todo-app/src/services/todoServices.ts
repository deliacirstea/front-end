import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todo`;

export const createTodo = async(todo : {title: string; completed:boolean;}) => {
    return await axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data);
}

export const loadTodos = async () => {
    return  await axios.get(baseUrl)
    .then(response => response.data);
}