import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import { createGroup, listGroupsByUser } from '../../api/groupService'


const columns = [
  { field: 'name', headerName: 'name', flex: 1 },
  { field: 'description', headerName: 'description', flex: 1 },
  { field: 'date_created', headerName: 'date create', flex: 1 },
];


const ManagementGroupPage = () => {

  const [group, setGroups] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    listMyGroups();
  }, []);


  const handleDelete = () => {
    if (selectedRow) {
      const updatedGroups = group.filter(Group => Group.id !== selectedRow.id);
      setGroups(updatedGroups);
      setSelectedRow(null);
      setFormData({ name: '', description: '' });
    }
  };

  const handleCreate = async () => {
    const newGroup = { ...formData };
    await createGroup(newGroup);
    listMyGroups()
    setFormData({ name: '', description: '' });
  };

  const handleEdit = () => {
    if (selectedRow) {
      const updatedGroups = group.map(Group => {
        if (Group.id === selectedRow.id) {
          return { ...Group, ...formData };
        }
        return Group;
      });
      setGroups(updatedGroups);
      setSelectedRow(null);
      setFormData({ name: '', description: '' });
    }
  };

  const listMyGroups = async () => {

    const listGroups = await listGroupsByUser();
    console.log(listGroups);
    setGroups(listGroups)
  }

  return (
    <div className="container">
      <h3 >My Groups Management</h3>
      <div className="mb-4 mt-4">
        <TextField
          label="Group Name"
          variant="outlined"
          size="small"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          sx={{ minWidth: '400px', margin: '0px 10px' }}
        />
        <Button variant="contained" color={selectedRow ? "secondary" : "success"} onClick={selectedRow ? handleEdit : handleCreate}
          sx={{ margin: '0px 10px' }}>
          {selectedRow ? 'Edit Group' : 'Add Group'}
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete} disabled={!selectedRow}>
          Delete Group
        </Button>

      </div>

      <DataGrid
        rows={group}
        columns={columns}
        pageSize={5}
        onRowClick={(event) => {
          toggle();

          function toggle() {
            console.log(event);
            if (selectedRow && selectedRow.id === event.row.id) {
              // toggle
              setSelectedRow(null);
              setFormData({ name: '', description: '' });
            } else {
              setSelectedRow(event.row);
              setFormData({ ...formData, description: event.row.description, name: event.row.name });
            }
          }
        }}
      />

    </div>
  );
};

export default ManagementGroupPage;
