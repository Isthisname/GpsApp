export const requestUserLocation = () => {
	if ('geolocation' in navigator === false) return console.error('Geolocation is not supported by this browser.');

	let currentPosition = {};

	function geolocationSuccess(position) {
		currentPosition = position;
	}

	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);

	return currentPosition;
};

function geolocationError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			console.error('User denied the request for Geolocation.');
			break;
		case error.POSITION_UNAVAILABLE:
			console.error('Location information is unavailable.');
			break;
		case error.TIMEOUT:
			console.error('The request to get user location timed out.');
			break;
		case error.UNKNOWN_ERROR:
			console.error('An unknown error occurred.');
			break;

		default:
			console.error('Geolocation is not supported by this browser.');
	}
}
