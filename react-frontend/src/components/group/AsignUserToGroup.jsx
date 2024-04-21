import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { listUsersByGroup } from '../../api/groupService'
import { listAllUsers } from '../../api/userService'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';


export default function AsignUserToGroup({ groups }) {

  useEffect(() => {
    async function fetchData() {
      setUnAssignedUsers(await listAllUsers());
    }
    fetchData();
  }, []);

  const [unAssignedUsers, setUnAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [enableSearch, setEnableSearch] = useState(false);
  const fixedOptions = [];
  const [value, setValue] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = async (e) => {
    const groupId = e[0];
    setEnableSearch(groupId)
    const aa = await listUsersByGroup(groupId);
    setUsers(aa)

  };

  return (
    <Box>

      <Box
        sx={{
          display: 'flex', // Utiliza un modelo de caja flexible

        }}
      >
        <Box sx={{ flex: 1, margin: '10px' }}>
          <Autocomplete 
          
          disabled={!enableSearch} 
          

            multiple
            id="fixed-tags-demo"
            value={value}
            onChange={(event, newValue) => {
              setValue([
                ...fixedOptions,
                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
              ]);
            }}
            options={unAssignedUsers}
            getOptionLabel={(option) => option.name}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  disabled={fixedOptions.indexOf(option) !== -1}
                />
              ))
            }
            style={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label="Search User" placeholder="Favorites" />
            )}
          /></Box>
        <Box sx={{ flex: 0.1, margin: '10px' }}>
          <Fab color="primary" aria-label="add" onClick={e => { }}>
            <AddIcon />
          </Fab>
        </Box>

      </Box>


      <Box
        sx={{
          display: 'flex', // Utiliza un modelo de caja flexible
          height: '75vh', // Establece la altura al 100% de la altura de la ventana (viewport)
          width: '100%'
        }}
      >
        {/* Primera columna */}



        <Box sx={{ flex: 0.2, margin: '10px' }}>
          <DataGrid
            rows={groups}
            columns={[{ field: 'name', headerName: 'Group', flex: 1 }]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}

            onRowSelectionModelChange={handleSelectionChange}
          />
        </Box>


        <Box sx={{ flex: 1, margin: '10px' }}>
          <DataGrid
            rows={users}
            columns={[{ field: 'name', headerName: 'User', flex: 1 }]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          // onRowSelectionModelChange={handleSelectionChange}
          />
        </Box>

      </Box>

    </Box>
  );
}