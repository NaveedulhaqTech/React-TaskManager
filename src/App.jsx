import React, { useState, useEffect } from 'react';
import TaskInput from './Components/TaskInput';
import TaskList from './Components/TaskList';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaPlus } from 'react-icons/fa';
import useTaskManager from './hooks/useTaskManager';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const {
    tasks,
    newTask,
    setNewTask,
    errors,
    setErrors,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    editingId,
    setEditingId,
    handleEdit,
    handleCancel,
    isModalOpen,
    setIsModalOpen,
    singleTask,
    setSingleTask
  } = useTaskManager();

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-black'}`}>
      <div className={`relative max-w-lg w-full p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
        <h1 className="text-4xl text-center text-red-500 mb-12 font-mono">Task Manager</h1>

        <button
          className={`absolute top-6 mb-4 flex items-center justify-center px-2 py-2 text-lg rounded-lg transition duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} hover:shadow-lg`}
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
          
        </button>

        <button
          className={`mb-4 flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded-lg transition duration-300 ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-300 hover:bg-blue-400'} shadow-lg self-end`}
          onClick={() => {
            setNewTask('');
            setEditingId(null);
            setErrors('');
            setIsModalOpen(true);
          }}
        >
          <FaPlus size={16} />
          <span>Add Task</span>
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} z-50 w-11/12 md:w-2/3 lg:w-1/2`}>
              <TaskInput
                handleUpdate={handleUpdateTask}
                handleAddTask={handleAddTask}
                handleCancel={handleCancel}
                newTask={newTask}
                setNewTask={setNewTask}
                editingId={editingId}
                errors={errors}
                isLightMode={!darkMode}
                singleTask={singleTask}
                setSingleTask={setSingleTask}
              />
            </div>
          </div>
        )}

        <TaskList
          tasks={tasks}
          handleDelete={handleDeleteTask}
          handleEdit={handleEdit}
          isLightMode={!darkMode}
        />
      </div>
    </div>
  );
};

export default App;
