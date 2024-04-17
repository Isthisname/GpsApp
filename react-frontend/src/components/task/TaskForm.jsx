import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Select, MenuItem, FormControl, InputLabel, Autocomplete } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import MapComponent from '../../components/maps/MapComponent'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { listGroupsByUser } from '../../api/groupService.js'


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    }]


const TaskForm = ({ onSubmit, initialTask, isEditing }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        onGroupCreated();
    }, []);

    const onGroupCreated = async () => {
        setGroups(await listGroupsByUser());
    };

    useEffect(() => {
        const fetchedUsers = [
            { id: '1', name: 'User 1' },
            { id: '2', name: 'User 2' },
            { id: '3', name: 'User 3' }
        ];
        setUsers(fetchedUsers);
    }, []);

    const [task, setTask] = useState(initialTask || {
        title: '',
        priority: '',
        type: '',
        status: '',
        location: '',
        description: '',
        due_date: '',
        group_id: '',
        target_id: '',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
    };

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Admin Task" value="1" />
                    <Tab label="Assigned Tasks" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">

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
                                    >
                                        <MenuItem value="todo">To Do</MenuItem>
                                        <MenuItem value="in_progress">In Progress</MenuItem>
                                        <MenuItem value="done">Done</MenuItem>
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
                    <MapComponent data={selectedItems} />
                </Container>

            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
        </TabContext>



    );
};

export default TaskForm;
