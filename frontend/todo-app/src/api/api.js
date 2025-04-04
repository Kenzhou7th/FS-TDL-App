import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/todos/';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Add a new todo
export const addTodo = async (todo) => {
  const response = await axios.post(API_BASE_URL, todo); // Send a POST request
  return response.data; // Return the added task
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_BASE_URL}${id}/`, updatedTodo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE_URL}${id}/`);
};