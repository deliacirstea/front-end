import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todo`;

export const createTodo = async(todo : {text: string; completed:boolean;}) => {
    return await axios.post(baseUrl, {
        text: todo.text,
        completed: todo.completed
    }).then(response => response.data);
}

export const loadTodos = async () => {
    return  await axios.get(baseUrl)
    .then(response => response.data);
}

export const updateTodo = (todo: { id?: number; text: string; completed: boolean;}) =>
{
    return axios.put(`${baseUrl}/${todo.id}`,{
        id: todo.id,
        text: todo.text,
        completed: todo.completed
    }).then(response => response.data);
}
export const deleteTodo = (id: number) => {
    return   axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data);
}