// GroupList.js

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AsignUserToGroup = ({ groups, handleEditClick, handleDeleteClick }) => {
  const columns=[
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'date_created', headerName: 'Creation Date', width: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row.id)}>
            Editar
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.row.id)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>OOOOOOOOOOO</h2>
      <DataGrid
        rows={groups}
        columns={columns}
        pageSize={5}
        checkboxSelection={false}
      />
    </div>
  );
};

export default AsignUserToGroup;
