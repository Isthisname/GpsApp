import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/task/TaskForm';
import MapComponent from '../../components/maps/MapComponent';

const AddTask = () => {

  const [selectedItems, setSelectedItems] = useState([]);
// Estado para controlar si estamos en modo de edición o creación
const [isEditing, setIsEditing] = useState(false);

// Función para manejar el envío del formulario
const handleSubmit = (taskData) => {
  if (isEditing) {
    // Lógica para actualizar la tarea existente
    console.log('Actualizando tarea:', taskData);
  } else {
    // Lógica para crear una nueva tarea
    console.log('Creando nueva tarea:', taskData);
  }
};

// Renderiza el componente TaskForm en la página
return (
  <div>
    <h2>{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
    <TaskForm onSubmit={handleSubmit} isEditing={isEditing} />
    <button onClick={() => setIsEditing(!isEditing)}>
      {isEditing ? 'Cancelar Edición' : 'Editar Tarea Existente'}
    </button>

    <MapComponent data={selectedItems} />
  </div>
);
};

export default AddTask;
