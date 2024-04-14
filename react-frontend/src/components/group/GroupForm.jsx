import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import {createGroup, listGroupsByUser} from '../../api/groupService.js'

const GroupForm = ({ onGroupCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
   setName(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      description: description,
    };

    setName('');
    setDescription('');

   const createdGroup =  await createGroup(formData);
   alert('¡Grupo creado exitosamente!');
    const list = await listGroupsByUser()

    onGroupCreated();
   


  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          margin="normal"
          multiline
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Group
        </Button>
      </Box>
    </form>
  );
};

export default GroupForm;
