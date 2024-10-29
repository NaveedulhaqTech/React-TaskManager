import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleDelete, handleEdit, isLightMode }) => {

    
    return (
        <div className={`relative w-full h-72 overflow-hidden rounded-lg ${isLightMode ? 'bg-gray-100' : 'bg-[#16213E]'}`}>
           {/* Top Gradient */}
           <div className={`absolute top-0 left-0 right-0 h-8 ${isLightMode ? 'bg-gradient-to-b from-[#EAEAEA] to-transparent' : 'bg-gradient-to-b from-[#16213E] to-transparent'} pointer-events-none`}></div>
            {/* Bottom Gradient */}
            <div className={`absolute bottom-0 left-0 right-0 h-8 ${isLightMode ? 'bg-gradient-to-t from-[#EAEAEA] to-transparent' : 'bg-gradient-to-t from-[#16213E] to-transparent'} pointer-events-none`}></div>

            <ul className={`task-list-container w-full h-full overflow-y-auto p-4 ${isLightMode ? 'bg-white light-mode' : 'bg-[#1B1B2A]'}`}>
                {tasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        handleDelete={handleDelete} 
                        handleEdit={handleEdit} 
                        isLightMode={isLightMode} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
