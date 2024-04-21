import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Icon, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

import { listTaskByUser, deleteTaskById } from '../../api/taskService.js'
import ConfirmationDialog from '../../components/alertDialog.jsx'


const AssignedTask = ({ handleEditClick }) => {
  const [selectedTask, setSelectedTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {setDialogOpen(false)};


  useEffect(() => {
    queryTaskList();
  }, []);

  const queryTaskList = async () => {
    const listTask = await listTaskByUser();
    setTasks(listTask);
  };


  const handleDeleteClick = async () => {
    if (selectedTask.id !== null && selectedTask.id !== '') {
      await deleteTaskById(selectedTask.id);
      queryTaskList();
      setDialogOpen(false);
    } else {
      alert('not is posible to delete the row!')
    }
  }

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
            <Button variant="contained" color="secondary" onClick={() => {
              setSelectedTask(params.row)
              setDialogOpen(true)
            }}>
              <DeleteOutlineTwoToneIcon />
            </Button>
          </Stack>

        </div>
      ),
    },
  ];

  return (
    <Box>
      <div>
      
        <ConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleDeleteClick}
          title="Confirm Action"
          message="¿are you sure that you want to delete this task?"
        />
      </div>
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
