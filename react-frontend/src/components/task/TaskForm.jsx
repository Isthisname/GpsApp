import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { listGroupsByUser, listUsersByGroup } from '../../api/groupService.js'
import MapHandlerSelect from '../maps/MapHandlerSelect.jsx';
import AssignedTask from './AssignedTask.jsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTask } from '../../api/taskService.js'

const TaskForm = ({ onSubmit, initialTask, isEditing }) => {

    const [value, setValue] = React.useState('1');
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    const onGroupCreated = async () => {
        setGroups(await listGroupsByUser());
    };

    const [task, setTask] = useState(initialTask || {
        title: '',
        priority: '',
        type: '',
        status: '',
        location:'',
        description: '',
        due_date: '',
        group_id: '',
        target_id: '',
        notes: ''
    });

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        if (e.target.name === "group_id") {
            task.target_id = ''
            setUsers(await listUsersByGroup(e.target.value))
        }
        setTask({ ...task, [name]: value });
    };

    const handleMark = (e) => {
        console.log("from mark" + e.latitude + " " + e.longitude)
        task.location = { latitude: e.latitude, longitude: e.longitude }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.location.latitude || !task.location.longitude) {
            alert("you should select a location!")
            return
        } else {
            onSubmit(task);
            setValue('1');
            setTask({})
        }
    };


    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    useEffect(() => {
        onGroupCreated();
    }, []);

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Admin Task" value="1" />
                    <Tab label="Assigned Tasks" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>

                    <Fab color="primary" aria-label="add" onClick={e => { setValue('2') }}>
                        <AddIcon />
                    </Fab>
                </Box>
                <AssignedTask handleEditClick={(e) => { console.log(e) }} />
            </TabPanel>
            <TabPanel value="2">

                <Container maxWidth="xl" >

                    <form onSubmit={handleSubmit} autoComplete="off">

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Title"
                                    name="title"
                                    value={task.title}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth
                                    size='small' variant="outlined">
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        label="Priority"
                                        name="priority"
                                        value={task.priority}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="1">High</MenuItem>
                                        <MenuItem value="2">Medium</MenuItem>
                                        <MenuItem value="3">Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={2}>

                                <FormControl fullWidth
                                    size='small' variant="outlined">
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        label="Type"
                                        name="type"
                                        value={task.type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="1">Type 1</MenuItem>
                                        <MenuItem value="2">Type 2</MenuItem>
                                        <MenuItem value="3">Type 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth
                                    size='small' variant="outlined">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        label="Status"
                                        name="status"
                                        value={task.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="COMPLETED">Completed</MenuItem>
                                        <MenuItem value="CREATED">Created</MenuItem>
                                        <MenuItem value="ASSIGNED">Assigned</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Description"
                                    name="description"
                                    value={task.description}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Location"
                                    name="location"
                                    value={task.location}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    disabled={true}
                                    required

                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Due date"
                                    name="due_date"
                                    value={task.due_date}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth
                                    size='small' variant="outlined">
                                    <InputLabel>Group</InputLabel>
                                    <Select
                                        label="Group"
                                        name="group_id"
                                        value={task.group_id}
                                        onChange={handleInputChange}
                                        required
                                    >

                                        {groups.map(group => (
                                            <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth
                                    size='small' variant="outlined">
                                    <InputLabel>Assigned to</InputLabel>
                                    <Select
                                        label="Assigned"
                                        name="target_id"
                                        value={task.target_id}
                                        onChange={handleInputChange}
                                    >
                                        {users.map(user => (
                                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Notes"
                                    name="notes"
                                    value={task.notes}
                                    onChange={handleInputChange}
                                    variant="outlined"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    size='small'
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {isEditing ? 'Update' : 'Create'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <MapHandlerSelect onClick={handleMark} />
                </Container>

            </TabPanel>
        </TabContext>



    );
};

export default TaskForm;
