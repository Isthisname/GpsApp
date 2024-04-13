// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import personIcon from './person.png'; // Import the person icon
import bearIcon from './bear.png'; // Import the bear icon
import GoogleMap from 'google-maps-react-markers'

const Map = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ lat: latitude, lng: longitude });
        setPathCoordinates([{ lat: latitude, lng: longitude }]);
        // Add the bear marker at the initial user position
        setMarkers([{ id: 'bear', lat: latitude, lng: longitude, icon: bearIcon }]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    const locationListener = (location) => {
      const { latitude, longitude } = location.coords;
      setUserPosition({ lat: latitude, lng: longitude });
      setPathCoordinates((prevCoordinates) => [...prevCoordinates, { lat: latitude, lng: longitude }]);
    };

    const locationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const watchId = navigator.geolocation.watchPosition(locationListener, null, locationOptions);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const handleMapClick = ({ lat, lng }) => {
    if (selectedMarker === bearIcon) {
      setMarkers([...markers, { id: 'bear', lat, lng, icon: bearIcon }]);
    }
  };

  const handleMarkerClick = (markerId) => {
    setSelectedMarker(markerId);
    setMarkers(markers.map(marker =>
      marker.id === markerId ? { ...marker, draggable: true } : { ...marker, draggable: false }
    ));
  };

  const handleMarkerDragStart = () => {
    setIsDragging(true);
  };

  const handleMarkerDrag = (markerId, { lat, lng }) => {
    if (isDragging) {
      const updatedMarkers = markers.map(marker =>
        marker.id === markerId ? { ...marker, lat, lng } : marker
      );
      setMarkers(updatedMarkers);
    }
  };

  const handleMarkerDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', backgroundColor: 'black', padding: '10px' }}>
        <h3 style={{ color: 'white' }}>Markers</h3>
        <div>
          <img src={personIcon} alt="Person Icon" style={{ width: '24px', height: '24px', cursor: 'pointer', marginBottom: '5px' }} onClick={() => handleMarkerClick(personIcon)} />
          <img src={bearIcon} alt="Bear Icon" style={{ width: '24px', height: '24px', cursor: 'pointer', marginBottom: '5px' }} onClick={() => handleMarkerClick(bearIcon)} />
        </div>
      </div>
      <div style={{ width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={userPosition || { lat: 0, lng: 0 }}
          center={userPosition}
          defaultZoom={15}
          onClick={handleMapClick}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              id={marker.id}
              lat={marker.lat}
              lng={marker.lng}
              icon={marker.icon}
              draggable={true}
              onDragStart={handleMarkerDragStart}
              onDrag={(e) => handleMarkerDrag(marker.id, e)}
              onDragEnd={handleMarkerDragEnd}
            />
          ))}
          {userPosition && <Marker lat={userPosition.lat} lng={userPosition.lng} icon={personIcon} />}
          {pathCoordinates.length > 1 && (
            <Polyline
              path={pathCoordinates}
              options={{ strokeColor: '#0000FF', strokeOpacity: 0.7, strokeWeight: 3 }}
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

const Marker = ({ id, icon, draggable, onDragStart, onDrag, onDragEnd }) => (
  
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <img
      draggable
      src={icon}
      alt="Marker Icon" 
      style={{ width: '24px', height: '24px', cursor: draggable ?'grab' : 'default' }}
      onDragStart={onDragStart}
      onDrag={(e) => onDrag(id, e)}
      onDragEnd={onDragEnd}
    />
  </div>
);

const Polyline = ({ path, options }) => (
  <google-map-polyline
    path={path}
    options={options}
  />
);

export default Map;
