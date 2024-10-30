import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';

const TaskItem = React.memo(({ task, handleDelete, handleEdit, isLightMode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusOptionsVisible, setStatusOptionsVisible] = useState(false);

    const handleViewDetails = () => {
        setIsModalOpen(true);
    };

    const handleCloseDetails = () => {
        setIsModalOpen(false);
        setStatusOptionsVisible(false); 
    };

    const handleStatusChange = (newStatus) => {
        
        task.status = newStatus; 
        setStatusOptionsVisible(false); 
    };

    return (
        <>
            <li className={`relative flex flex-col justify-between m-4 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                <div className='flex flex-col'>
                    <h2 className={`text-md font-bold mb-2 border-b-2 ${isLightMode ? 'border-b-slate-800' : 'border-b-gray-500'}`}>{task.text}</h2>
                    <div className='flex justify-between mb-1'>
                        <span className='text-gray-400 font-semibold'>Due:</span>
                        <p className='font-semibold'>{task.dueDate || 'No due date'}</p>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-400 font-semibold'>Status:</span>
                        <div className='relative'>
                            <button onClick={() => setStatusOptionsVisible(!statusOptionsVisible)} className={`font-bold p-1 rounded-md ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                            </button>
                            {statusOptionsVisible && (
                               <div className={`absolute right-0 mt-1 shadow-lg rounded-md ${isLightMode ? 'bg-white' : 'bg-gray-800'}`}>
                               <button 
                                   onClick={() => handleStatusChange('pending')} 
                                   className={`block w-full px-4 py-2 ${isLightMode ? 'hover:bg-gray-200 text-black' : 'hover:bg-gray-700 text-white'}`}>
                                   Pending
                               </button>
                               <button 
                                   onClick={() => handleStatusChange('process')} 
                                   className={`block w-full px-4 py-2 ${isLightMode ? 'hover:bg-gray-200 text-black' : 'hover:bg-gray-700 text-white'}`}>
                                   Process
                               </button>
                               <button 
                                   onClick={() => handleStatusChange('completed')} 
                                   className={`block w-full px-4 py-2 ${isLightMode ? 'hover:bg-gray-200 text-black' : 'hover:bg-gray-700 text-white'}`}>
                                   Completed
                               </button>
                           </div>
                           
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="flex mt-4 gap-2">
                    <button onClick={handleViewDetails} className={`p-2 rounded-md ${isLightMode ? 'text-blue-600 hover:bg-blue-100' : 'text-blue-400 hover:bg-blue-700'}`}>
                        <FaEye />
                    </button>
                    <button onClick={() => handleEdit(task.id)} className={`p-2 rounded-md ${isLightMode ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}>
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(task.id)} className={`p-2 rounded-md ${isLightMode ? 'text-red-600 hover:bg-red-100' : 'text-red-400 hover:bg-red-600'}`}>
                        <FaTrash />
                    </button>
                </div>
            </li>

            {/* Modal for displaying task details */}
            {isModalOpen && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity backdrop-blur-sm duration-300`}>
                    <div className={`bg-${isLightMode ? 'white' : 'gray-900'} rounded-lg shadow-xl p-8 w-11/12 md:w-3/5 lg:w-1/2`} style={{ zIndex: 1000 }}>
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-3xl font-bold">{task.text}</h2>
                            <button onClick={handleCloseDetails} className="text-gray-600 hover:text-gray-800">
                                <FaTimes size={28} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="font-semibold">Due Date:</label>
                                <p className={`font-medium ${task.dueDate ? 'text-gray-400' : 'text-red-500'}`}>
                                    {task.dueDate || 'No due date'}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <label className="font-semibold">Priority:</label>
                                <p className={`font-medium ${task.priority === 'high' ? 'text-red-500' : 'text-gray-400'}`}>
                                    {task.priority || 'Low'}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <label className="font-semibold">Status:</label>
                                <button onClick={() => handleStatusChange(task.status === 'completed' ? 'process' : 'completed')} className={`font-medium p-1 rounded-md ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                </button>
                            </div>
                            <div>
                                <label className="font-semibold">Description:</label>
                                <div className={`mt-2 p-4 border rounded-md h-32 overflow-y-auto ${isLightMode ? 'bg-gray-100 text-gray-800' : 'bg-gray-700 text-gray-300'}`}>
                                    {task.description || 'No description provided.'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default TaskItem;
