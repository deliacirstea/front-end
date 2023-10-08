import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';


const sampleTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false,
  };
  
    const mockMessageError = jest.fn();
    jest.mock('antd', () => ({
    ...jest.requireActual('antd'), 
    message: {
        error: mockMessageError, 
    },
    }));

  jest.mock('antd', () => {
    return {
      ...jest.requireActual('antd'), 
      message: {
        error: jest.fn(), 
      },
    };
  });
  
 
  jest.mock('./TodoEdit', () => {
    return {
      __esModule: true,
      default: jest.fn(() => null), 
    };
  });
  
  describe('TodoItem component', () => {
    it('renders the TodoItem component with a task', () => {
      render(<TodoItem todo={sampleTodo} onTodoToggle={function (todo: { id: number; text: string; completed: boolean; }): void {
          throw new Error('Function not implemented.');
      } } onTodoRemoval={function (todo: { id: number; text: string; completed: boolean; }): void {
          throw new Error('Function not implemented.');
      } } />);
      
    
      const taskTextElement = screen.getByText('Test Todo');
      expect(taskTextElement).toBeInTheDocument();
    });
  
    it('calls onTodoToggle when the switch is clicked', () => {
      const onTodoToggle = jest.fn();
      render(<TodoItem todo={sampleTodo} onTodoToggle={onTodoToggle} onTodoRemoval={function (todo: { id: number; text: string; completed: boolean; }): void {
          throw new Error('Function not implemented.');
      } } />);
      
     
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      
      expect(onTodoToggle).toHaveBeenCalledWith(sampleTodo);
    });
  
    it('calls handleTodoRemoval when the remove button is clicked', () => {
      const onTodoRemoval = jest.fn();
      render(<TodoItem todo={sampleTodo} onTodoRemoval={onTodoRemoval} onTodoToggle={function (todo: { id: number; text: string; completed: boolean; }): void {
          throw new Error('Function not implemented.');
      } } />);
      
      
      const removeButton = screen.getByText('X');
      fireEvent.click(removeButton);
      
     
      expect(onTodoRemoval).toHaveBeenCalledWith(sampleTodo);
    });
  
    it('displays an error message if handleTodoRemoval throws an error', () => {
      const onTodoRemovalWithError = () => {
        throw new Error('Test error');
      };
      render(<TodoItem todo={sampleTodo} onTodoRemoval={onTodoRemovalWithError} onTodoToggle={function (todo: { id: number; text: string; completed: boolean; }): void {
          throw new Error('Function not implemented.');
      } } />);
      
     
      const removeButton = screen.getByText('X');
      fireEvent.click(removeButton);
      
     
      expect(require('antd').message.error).toHaveBeenCalledWith(
        'An error occurred while removing the todo. Please try again later.'
      );
    });
  });


