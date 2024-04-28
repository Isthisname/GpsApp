import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';
import MarkerWrapper from './MarkerWrapper.jsx';

const MapComponent = ({ data }) => {
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
					{data?.map(user => (
						<MarkerWrapper user={user} key={user?.id} />
					))}
				</Map>
			</APIProvider>
		</Box>
	);
};

export default MapComponent;
