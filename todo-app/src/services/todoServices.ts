import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todo`;

class NetworkError extends Error {
    constructor(message: string){
        super(message);
        this.name='NetworkErros';
    }
}

interface Todo{
    id?: number;
    text: string;
    completed: boolean;
}

export const createTodo = async (todo: Todo) => {
    try {
        const response = await axios.post(baseUrl, {
            text: todo.text,
            completed: todo.completed
        });
        return response.data;
    } catch (error) {
        console.error("Error in creating Todo", error);
        throw new NetworkError("Failed to create todo. Please check your internet connection or try again later.");
    }
}


export const loadTodos = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error("Error in loading Todo", error);
        throw new NetworkError("Failed to load todos. Please check your internet connection or try again later.");
    }
}


export const updateTodo = async (todo: Todo) => {
    try {
        const response = await axios.put(`${baseUrl}/${todo.id}`, {
            id: todo.id,
            text: todo.text,
            completed: todo.completed
        });
        return response.data;
    } catch (error) {
        console.error("Error in updating Todo", error);
        throw new NetworkError("Failed to update todo. Please check your internet connection or try again later.");
    }
}


export const deleteTodo = async (id: number) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error in deleting Todo", error);
        throw new NetworkError("Failed to delete todo. Please check your internet connection or try again later.");
    }
}