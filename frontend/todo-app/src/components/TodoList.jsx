import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../api/api';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');

useEffect(() => {
  const getTodos = async () => {
    const todos = await fetchTodos(); // Use fetchTodos here
    setTodos(todos);
  };
  getTodos();
}, []);

// Function to toggle the completion status of a task
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

// Function to delete a task
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

 // Function to edit the text of a task
  const handleEdit = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Function to add a new task
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return; 
    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo(''); 
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Function to filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="container">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </button>
      <h1>Todo List with Django</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <br />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <div className="tasks">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;