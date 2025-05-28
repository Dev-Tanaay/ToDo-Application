import React from 'react';

const ToDo = ({ todos, onToggleCompletion }) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex flex-col p-4 border rounded shadow bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <h3
              className={`text-xl font-semibold ${
                todo.completion ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {todo.title}
            </h3>
            <button
              onClick={() => onToggleCompletion(todo._id)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                todo.completion
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {todo.completion ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
          <p
            className={`mt-2 ${
              todo.completion ? 'line-through text-gray-400' : 'text-gray-600'
            }`}
          >
            {todo.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ToDo;
