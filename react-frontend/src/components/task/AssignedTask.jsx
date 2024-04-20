import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Icon, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

import { listTaskByUser } from '../../api/taskService.js'




const AssignedTask = ({ handleEditClick, handleDeleteClick }) => {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    queryTaskList();
  }, []);

  const queryTaskList = async () => {

    const listTask = await listTaskByUser();
    console.log(listTask);
    setTasks(listTask);
  };


  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'priority', headerName: 'Priority', flex: 1 },
    { field: 'createdAt', headerName: 'Creation Date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <Stack direction="row" spacing={2} >
            <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row)}>
              <EditTwoToneIcon />
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.row.id)}>
              <DeleteOutlineTwoToneIcon />
            </Button>
          </Stack>

        </div>
      ),
    },
  ];


  return (
    <Box>
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSize={5}
        checkboxSelection={false}
      />
    </Box>
  );
};

export default AssignedTask;
