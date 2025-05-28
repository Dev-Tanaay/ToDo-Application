import React, { useState } from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CreateToDo = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      alert('Todo created successfully!');
      setTitle('');
      setDescription('');

      if (onTodoCreated) onTodoCreated(); 

    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        type="text"
        placeholder="Enter the title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Enter the description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add ToDo
      </button>
    </form>
  );
};

export default CreateToDo;
