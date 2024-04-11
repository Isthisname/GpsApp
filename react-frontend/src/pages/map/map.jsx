import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };
  const center = {    
    lat: 40.2859779844355,// default latitude
    lng:  -111.70318805787876 // default longitude
  };


const MapPage = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: null,
        libraries
      });



      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }
    
      return (
        <div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      );
    };

export default MapPage;
