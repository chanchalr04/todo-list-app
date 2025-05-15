import React, { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: task,
        isCompleted: false,
        createdAt: new Date().toLocaleString()
      };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.isCompleted;
    if (filter === 'Incomplete') return !task.isCompleted;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 flex-grow mr-2 rounded-lg"
            placeholder="Enter a new task"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="flex mb-4 justify-between">
          <button onClick={() => setFilter('All')} className="px-2 py-1 bg-gray-300 rounded">All</button>
          <button onClick={() => setFilter('Completed')} className="px-2 py-1 bg-green-300 rounded">Completed</button>
          <button onClick={() => setFilter('Incomplete')} className="px-2 py-1 bg-red-300 rounded">Incomplete</button>
        </div>

        <ul className="space-y-2">
          {filteredTasks.map(task => (
            <li key={task.id} className={`flex justify-between items-center p-2 rounded-lg ${task.isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}>              
              <div>
                <span>{task.text}</span>
                <small className="text-xs ml-2">({task.createdAt})</small>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleToggleComplete(task.id)} className="px-2 py-1 bg-blue-500 text-white rounded">{task.isCompleted ? 'Undo' : 'Done'}</button>
                <button onClick={() => handleDeleteTask(task.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
