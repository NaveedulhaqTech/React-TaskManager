import React from 'react';
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa';

const TaskInput = ({ handleUpdate, handleAddTask, handleCancel, singleTask, setSingleTask, editingId, errors, isLightMode }) => {
    return (
        <div className={`flex flex-col w-full p-4 rounded-lg shadow-lg ${isLightMode ? 'bg-white' : 'bg-[#1B1B2A]'}`}>
            {/* Task Title */}
            <label className="mb-2 font-semibold">Task Title</label>
            <input
                type='text'
                placeholder='What Next?'
                value={singleTask.text}
                onChange={(e) => setSingleTask({ ...singleTask, text: e.target.value })}
                className={`w-full p-4 mb-4 rounded-lg transition duration-300 ${isLightMode ? 'bg-white text-black' : 'bg-[#1B1B2A] text-[#EAEAEA]'}`}
            />
            
            {/* Due Date */}
            <label className="mb-2 font-semibold">Due Date</label>
            <input
                type='date'
                value={singleTask.dueDate}
                onChange={(e) => setSingleTask({ ...singleTask, dueDate: e.target.value })}
                className={`w-full p-4 mb-4 rounded-lg transition duration-300 ${isLightMode ? 'bg-white text-black' : 'bg-[#1B1B2A] text-[#EAEAEA]'}`}
            />

            {/* Priority */}
            <label className="mb-2 font-semibold">Priority</label>
            <select
                value={singleTask.priority}
                onChange={(e) => setSingleTask({ ...singleTask, priority: e.target.value })}
                className={`w-full p-4 mb-4 rounded-lg transition duration-300 ${isLightMode ? 'bg-white text-black' : 'bg-[#1B1B2A] text-[#EAEAEA]'}`}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            {/* Description */}
            <label className="mb-2 font-semibold">Description</label>
            <textarea
                placeholder='Description'
                value={singleTask.description}
                onChange={(e) => setSingleTask({ ...singleTask, description: e.target.value })}
                className={`w-full p-4 mb-4 rounded-lg transition duration-300 ${isLightMode ? 'bg-white text-black' : 'bg-[#1B1B2A] text-[#EAEAEA]'}`}
            />

            <div className="flex mt-2 gap-2">
                <button
                    onClick={editingId ? handleUpdate : handleAddTask}
                    className={`flex items-center justify-center p-2 rounded-lg ${isLightMode ? 'bg-blue-500 text-white' : 'bg-[#E94560] text-white'} transition duration-300 hover:bg-opacity-80 shadow-md`}
                >
                    {editingId ? <FaEdit /> : <FaPlus />}
                </button>
                <button
                    onClick={handleCancel}
                    className={`flex items-center justify-center p-2 rounded-lg ${isLightMode ? 'bg-gray-400 text-black' : 'bg-red-500 text-white'} transition duration-300 hover:bg-opacity-80 shadow-md`}
                >
                    <FaTimes />
                </button>
            </div>

            {errors && (
                <p className={`mt-2 p-2 rounded-lg text-center ${isLightMode ? 'bg-red-200 text-red-800' : 'bg-red-600 text-white'}`}>
                    {errors}
                </p>
            )}
        </div>
    );
};

export default TaskInput;
