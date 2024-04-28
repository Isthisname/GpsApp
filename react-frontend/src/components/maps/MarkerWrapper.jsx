import { Fragment, useState } from 'react';
import { Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { CircleRounded } from '@mui/icons-material';

const MarkerWrapper = ({ user }) => {
	const [, setInfowindowOpen] = useState(false);

	const toggleClick = () => {
		setInfowindowOpen(prev => !prev);
	};

	return (
		<Fragment>
			<Marker
				position={{ lat: user?.target_id?.position?.latitude, lng: user?.target_id?.position?.longitude }}
				onClick={toggleClick}
			/>
			<InfoWindow
				position={{ lat: user?.location?.latitude, lng: user?.location?.longitude }}
				onCloseClick={() => setInfowindowOpen(false)}
			>
				<section className=' d-flex align-items-center gap-1'>
					<CircleRounded sx={{ color: user?.target_id?.status === 'online' ? 'green' : 'red' }} fontSize='20' />
					<h6 className='text-primary my-2 text-capitalize'>
						<strong>User:</strong> {user?.target_id?.username}
					</h6>
				</section>
				<p className='text mb-2 text-capitalize'>
					<strong>Task title:</strong> {user?.title}
				</p>
				{user?.notes?.length > 0 && (
					<p className='text mb-2 text-capitalize'>
						<strong>Notes:</strong> {user?.notes}
					</p>
				)}
			</InfoWindow>
		</Fragment>
	);
};

export default MarkerWrapper;
