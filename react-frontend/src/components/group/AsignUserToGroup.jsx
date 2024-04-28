import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Box, Icon, Grid, Stack } from "@mui/material";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

import { listUsersByGroup, addUsersToGroup } from "../../api/groupService";
import { listAllUsers } from "../../api/userService";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { deleteUserFromGroup } from "../../api/groupService";

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

  const handleRemoveUser = async (userId) => {
    if (!selectedGroup) {
      alert("No group selected!");
      return;
    }
    try {
      await removeUserFromGroup(selectedGroup, userId);
      setUsers(await listUsersByGroup(selectedGroup)); // Refresh the list after removal
      alert("User removed successfully!");
    } catch (error) {
      alert("Failed to remove user");
      console.error("Error removing user:", error);
    }
  };

  const handleSave = async () => {
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
    setSelectedGroup(selectedGroup);
    setSelectedItems([]);
    setUsers([]);
    setUsers(await listUsersByGroup(selectedGroup));
  };
  const userColumns = [
    { field: "name", headerName: "Members", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleRemoveUser(params.row);
                console.log(params.row);
                console.log("grouppp" + selectedGroup);
                //setSelectedTask(params.row)
                //setDialogOpen(true)
              }}
            >
              <DeleteOutlineTwoToneIcon />
            </Button>
          </Stack>
        </div>
      ),
    },
  ];

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
          columns={userColumns}
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
