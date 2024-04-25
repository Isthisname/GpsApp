import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateUser } from './api/userService';
import { requestUserLocation } from './utils/requestUserLocation';
const root = ReactDOM.createRoot(document.getElementById('root'));

const isOnline = () => {
	return navigator.onLine;
};

const upateUserLocationAndOnlineStatus = () => {
	let status = isOnline() ? 'online' : 'offline';

	let requestPayload = { status };

	let position = requestUserLocation();

	// add the user's position to the new update request payload we were able to obtain the user's position
	if (Object.keys(position)?.length > 0) {
		requestPayload.latitude = position?.coords?.latitude;
		requestPayload.longitude = position?.coords?.longitude;
	}

	updateUser(requestPayload);
};

window.addEventListener('online', upateUserLocationAndOnlineStatus);
window.addEventListener('offline', upateUserLocationAndOnlineStatus);
window.addEventListener('beforeunload', upateUserLocationAndOnlineStatus);
window.addEventListener('DOMContentLoaded', upateUserLocationAndOnlineStatus);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
