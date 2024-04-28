import React, { useState, useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';
import { listTaskByUser } from '../../api/taskService.js';
import MarkerWrapper from './MarkerWrapper.jsx';

const MapComponent = ({ data }) => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		queryTaskList();
	}, []);

	const queryTaskList = async () => {
		const listTask = await listTaskByUser();
		setTasks(listTask);
	};

	return (
		<Box
			sx={{
				height: '100vh',
				width: '100%',
			}}
		>
			<APIProvider apiKey={'AIzaSyBhJ6Mz2-NBrPZeuXtlaROqHrT2hN0aKVg'}>
				<Map
					defaultZoom={8}
					defaultCenter={{ lat: 40.5486807849397, lng: -111.9137212403442 }}
					gestureHandling={'greedy'}
					style={{ width: '100%', height: '100%' }}
				>
					{tasks?.map(user => (
						<MarkerWrapper user={user} key={user?.id} />
					))}
				</Map>
			</APIProvider>
		</Box>
	);
};

export default MapComponent;
