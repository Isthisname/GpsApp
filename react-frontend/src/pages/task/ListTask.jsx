import React, { useEffect, useState } from 'react';
import { taskAssignedToMe } from '../../api/taskService';
import DataGrid from '../../components/GridComponent';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Stack from '@mui/material/Stack';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { editTask } from '../../api/taskService';
import { requestUserLocation } from '../../utils/requestUserLocation';

const ListTask = () => {
	const [myRows, setMyRows] = useState([]);
	const [show, setShow] = useState(false);
	const [task, setTask] = useState({});
	const [note, setNode] = useState('');
	const [location, setLocation] = useState({});
	const [editing, setEditing] = useState(false);
	const [status, setStatus] = useState('');

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productsData = await taskAssignedToMe();
				setMyRows(productsData);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchProducts();
		const position = requestUserLocation();
		let longitude = position?.coords?.longitude;
		let latitude = position?.coords?.latitude;
		setLocation({ longitude, latitude });
	}, []);

	const handleShow = (row, show) => {
		setShow(show);
		setTask(row);
	};

	const myColumns = [
		{ field: 'title', headerName: 'Title', width: 150 },
		{ field: 'description', headerName: 'Description', width: 200 },
		{
			field: 'action',
			headerName: 'Action',
			width: 80,
			renderCell: ({ row }) => (
				<div>
					<Stack direction='row' spacing={2}>
						<Button variant='contained' color='primary' onClick={() => handleShow(row, true)}>
							<EditTwoToneIcon />
						</Button>
					</Stack>
				</div>
			),
		},
	];

	const handleAddNote = e => {
		e.preventDefault();
		if (!note) return; // the form has a validation added, this is a reaguard
		if (!status) return; // the form has a validation added, this is a reaguard

		setEditing(true);
		const taskToEdit = {
			notes: [note],
			status,
		};

		// add the location of the user if we were able to get the current user's location
		if (Object.keys(location)?.length > 0) {
			taskToEdit.location = location;
		}

		editTask(taskToEdit, task?.id);
		setEditing(false);
		setNode('');
		setStatus('');
	};

	return (
		<div>
			<h2>List Tasks Page </h2>
			<Box width={'100%'}>
				<DataGrid rows={myRows} columns={myColumns}></DataGrid>
			</Box>
			<Modal show={show} onHide={() => setShow(false)} centered>
				<Modal.Body>
					<form onSubmit={handleAddNote}>
						<Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
							<TextField
								label='Note'
								value={note}
								onChange={e => setNode(e.target.value)}
								margin='normal'
								required
								sx={{ marginBlockEnd: '1rem' }}
							/>
							<FormControl fullWidth size='small' variant='outlined'>
								<InputLabel>Status</InputLabel>
								<Select
									label='Status'
									name='status'
									value={status}
									onChange={e => setStatus(e.target.value)}
									required
									sx={{ paddingBlock: '.5rem' }}
								>
									<MenuItem value='COMPLETED'>Completed</MenuItem>
									<MenuItem value='CREATED'>Created</MenuItem>
									<MenuItem value='ASSIGNED'>Assigned</MenuItem>
								</Select>
							</FormControl>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								sx={{ mt: 2 }}
								onClick={handleAddNote}
								disabled={editing}
							>
								{editing ? 'Adding...' : 'Add'}
							</Button>
						</Box>
					</form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ListTask;
