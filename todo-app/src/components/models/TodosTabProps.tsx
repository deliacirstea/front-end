export type TodosTabProps = {
    todos: {
        id: number;
        text: string;
        completed: boolean;
    }[];
    onTodoToggle: (todo: {id:number; text:string;completed:boolean;})=>void; 
    onTodoRemoval: (todo:{id:number; text:string; completed:boolean;}) =>void;

};