import React from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import { QueryClient, QueryClientProvider } from "react-query";
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient({});
function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
        
          <div className="App">
          <div><TodoList/></div>
    </div>
     </QueryClientProvider>
    
  );
}

export default App;
