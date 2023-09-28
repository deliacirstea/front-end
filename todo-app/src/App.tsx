import React from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({});
function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
        {<div className="App">
      <TodoList/>
    </div>}
     </QueryClientProvider>
    
  );
}

export default App;
