import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleDelete, handleEdit, isLightMode }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredTasks = tasks.filter(task => {
        if (activeFilter === 'all') return true; 
        return task.status.toLowerCase() === activeFilter.toLowerCase();
    });

    const getButtonClass = (filter) => {
        const baseClass = `w-20 px-2 py-2 first:rounded-l-md last:rounded-r-md  sm: px-1 py-1 text-sm `;
        const activeClass = activeFilter === filter
            ? (isLightMode ? 'bg-gray-500 text-white' : 'bg-gray-900 text-white')
            : isLightMode ? 'text-black-500 bg-gray-200 hover:bg-gray-100 ' : 'text-gray-300 bg-[#071027] hover:bg-[#16213E]';

        return `${baseClass} ${activeClass}`;
    };



    return (
        <>
        {tasks.length > 0 && tasks.some((task) => task.id !== '') && (
            <div className={`flex items-center justify-center `} >

                <button className={getButtonClass('all')} onClick={() => setActiveFilter('all')}>All</button>
                <button className={getButtonClass('pending')} onClick={() => setActiveFilter('pending')}>Pending</button>
                <button className={getButtonClass('process')} onClick={() => setActiveFilter('process')}>In Process</button>
                <button className={getButtonClass('completed')} onClick={() => setActiveFilter('completed')}>Completed</button>

            </div>
        ) }
            <div className={`relative w-full h-72 overflow-hidden rounded-lg ${isLightMode ? 'bg-gray-100' : 'bg-[#16213E]'}`}>
                {/* Top Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-8 ${isLightMode ? 'bg-gradient-to-b from-[#EAEAEA] to-transparent' : 'bg-gradient-to-b from-[#16213E] to-transparent'} pointer-events-none`}></div>
                {/* Bottom Gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-8 ${isLightMode ? 'bg-gradient-to-t from-[#EAEAEA] to-transparent' : 'bg-gradient-to-t from-[#16213E] to-transparent'} pointer-events-none`}></div>

                <ul className={`task-list-container w-full h-full overflow-y-auto p-4 ${isLightMode ? 'bg-white light-mode' : 'bg-[#1B1B2A]'}`}>
                    {filteredTasks.length > 0 ? filteredTasks?.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            isLightMode={isLightMode}
                        />
                    )) : <p className='py-4'> No Task Available
                          </p>}
                </ul>
            </div>
        </>
    );
};

export default TaskList;
