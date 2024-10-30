// useTaskManager.js
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useTaskManager = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [singleTask, setSingleTask] = useState({
    id : uuidv4(),
    text: '',
    dueDate: '',
    priority: 'low',
    status: 'pending',
    description: '',
    createdAt: new Date().toISOString()
  })

  const [errors, setErrors] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 
  const validateTask = (task) => {
    const trimmedText = task.text.trim();
    
    if (trimmedText === '') {
        return 'Task Cannot Be Empty';
    }
    


    if (task.dueDate && new Date(task.dueDate) < new Date()) {
        return 'Due Date Cannot Be in the Past';
    }

    return '';
};

const handleAddTask = () => {
    const error = validateTask(singleTask);

    if (error) {
        setErrors(error);
        return;
    }

    setTasks((prevTasks) => [
        ...prevTasks,
        { ...singleTask, id: uuidv4(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ]);
    

    setSingleTask({
        id: uuidv4(),
        text: '',
        dueDate: '',
        priority: 'low',
        status: 'pending',
        description: ''
    });
    setErrors('');
    setIsModalOpen(false);
};

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  const handleEdit = (id) => {
    const editTask = tasks.find(task => task.id === id);
    if (editTask) {
     setSingleTask({text : editTask.text, dueDate: editTask.dueDate, 
      priority: editTask.priority, status : editTask.status, description : editTask.description })
      setEditingId(id);
      setErrors('');
      setIsModalOpen(true);
    }
  };


  const handleUpdateTask = () => {
   
    const error = validateTask(singleTask); // Validate the trimmed task
  
    if (error) {
      setErrors(error);
      return;
    }
  
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingId ? { ...task, text : singleTask.text, dueDate: singleTask.dueDate, 
          priority: singleTask.priority, status : singleTask.status, description : singleTask.description } : task
      )
    );
    setSingleTask({
      id: uuidv4(),
      text: '',
      dueDate: '',
      priority: 'low',
      status: 'pending',
      description: ''
  });

    setErrors('');
    setEditingId(null);
    setIsModalOpen(false); // Close the modal after updating
  };
  


  const handleCancel = () => {
    setEditingId(null);
    setSingleTask({
      id: uuidv4(),
      text: '',
      dueDate: '',
      priority: 'low',
      status: 'pending',
      description: ''
  });
    setErrors('');
    setIsModalOpen(false);
  };

  return {
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

  };
};

export default useTaskManager;
