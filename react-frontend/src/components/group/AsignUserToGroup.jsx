import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { listUsersByGroup, addUsersToGroup } from "../../api/groupService";
import { listAllUsers } from "../../api/userService";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

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
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  const handleSelectionChange = async (e) => {
    const groupId = e[0];
    setEnableSearch(groupId);
    setSelectedGroup(groupId);
    setSelectedItems([]);
    setUsers([]);
    setUsers(await listUsersByGroup(groupId));
  };

  const handleSave = () => {
    if (!selectedGroup) {
      alert("you need to select a group!");
      return;
    }

    if (selectedItems.length < 1) {
      alert("you need to select at least one user!");
      return;
    }

    const arrayUserIds = selectedItems.map((objeto) => objeto.id);

    const request = {
      group_id: selectedGroup,
      user_ids: arrayUserIds,
    };

    addUsersToGroup(request);
  };

  return (
    <Box sx={{ height: "75vh", width: "100%", display: "flex" }}>
      <Box sx={{ marginRight: "10px" }}>
        <DataGrid
          rows={groups}
          columns={[{ field: "name", headerName: "My Groups", flex: 1 }]}
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

      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Autocomplete
            sx={{ flex: 1, marginBottom: "10px" }}
            disabled={!enableSearch}
            multiple
            id="fixed-tags-demo"
            value={selectedItems}
            onChange={(event, newValue) => {
              setSelectedItems(newValue);
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
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find People"
                placeholder="Favorites"
              />
            )}
          />

          <Box sx={{ flex: 0.1, marginLeft: "10px" }}>
            <Fab color="primary" aria-label="add" onClick={handleSave}>
              <AddIcon />
            </Fab>
          </Box>
        </Box>
        <DataGrid
          sx={{ flex: 0.1 }}
          rows={users}
          columns={[{ field: "name", headerName: "Members", flex: 1 }]}
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
  );
}
