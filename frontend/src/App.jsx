import React, { useEffect, useState } from 'react';
import CreateToDo from './components/CreateToDo';
import ToDo from './components/ToDo';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleCompletion = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to update todo completion status');
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completion: !todo.completion } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo completion:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My ToDo App</h1>
      <CreateToDo onTodoCreated={fetchTodos} />
      <ToDo todos={todos} onToggleCompletion={toggleCompletion} />
    </div>
  );
};

export default App;
