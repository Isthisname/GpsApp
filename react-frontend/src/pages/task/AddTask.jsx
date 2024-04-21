import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/task/TaskForm';
import { createTask } from '../../api/taskService'
import { daDK } from '@mui/x-data-grid';


const AddTask = () => {
  const [isEditing, setIsEditing] = useState(false);
const handleSubmit = (taskData) => {
    if (isEditing) {
      console.log('Actualizando tarea:', taskData);
    } else {
    console.log('Creando nueva tarea:', taskData);
      validateAndCreateTask(taskData)
    }
  };



  const validateAndCreateTask = (taskData) => {

    const requestTask = {
      title: taskData.title,
      description: taskData.description,
      group_id: taskData.group_id,
      type: taskData.type,
      status: taskData.status,
      priority:taskData.priority,
      target_id: taskData.target_id,
      location: taskData.location
    };
    createTask(requestTask)
  }

  return (
    <div>
      <TaskForm onSubmit={handleSubmit} isEditing={isEditing} />
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancelar Edición' : 'Editar Tarea Existente'}
      </button>
    </div>
  );
};

export default AddTask;
