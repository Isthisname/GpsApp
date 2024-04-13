import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import bearIcon from './bear.png'; // Import the bear icon

const Map = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Get user's current position using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []); // Run once on component mount

  const handleMapClick = ({ lat, lng }) => {
    // Add a new marker at the clicked position
    if (selectedMarker) {
      setMarkers([...markers, { id: markers.length, lat, lng, icon: selectedMarker }]);
    }
  };

  const handleMarkerClick = (markerId) => {
    // Set the selected marker when clicked from the menu
    setSelectedMarker(markerId);
  };

  const addMarkerFromDatabase = (latitude, longitude) => {
    // Add a new marker at the provided latitude and longitude
    setMarkers([...markers, { id: markers.length, lat: latitude, lng: longitude, icon: bearIcon }]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar or menu */}
      <div style={{ width: '20%', backgroundColor: 'black', padding: '10px' }}>
        <h3 style={{ color: 'white' }}>Markers</h3>
        {/* Marker menu */}
        <div>
          <img src={bearIcon} alt="Bear Icon" style={{ width: '24px', height: '24px', cursor: 'pointer', marginBottom: '5px' }} onClick={() => handleMarkerClick(bearIcon)} />
          {/* Add more marker icons as needed */}
        </div>
      </div>
      {/* Map */}
      <div style={{ width: '80%', height: '100vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={userPosition}
          center={userPosition}
          defaultZoom={15}
          onClick={handleMapClick}
        >
          {/* Render markers */}
          {markers.map((marker) => (
            <Marker key={marker.id} lat={marker.lat} lng={marker.lng} icon={marker.icon} />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

const Marker = ({ icon }) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    {/* Render marker icon */}
    <img src={icon} alt="Marker Icon" style={{ width: '24px', height: '24px' }} />
  </div>
);

export default Map;
