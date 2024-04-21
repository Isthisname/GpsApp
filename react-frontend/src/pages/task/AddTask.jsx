import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/task/TaskForm';


const AddTask = () => {
const [isEditing, setIsEditing] = useState(false);
const handleSubmit = (taskData) => {
  if (isEditing) {
    console.log('Actualizando tarea:', taskData);
  } else {
    console.log('Creando nueva tarea:', taskData);
  }
};

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
