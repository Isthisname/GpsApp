import React from 'react';
import MapComponent from '../../components/maps/MapComponent'
import { Box } from '@mui/material';

const MapPage = () => {
  return (
    <Box  sx={{
        height: '100vh',
        width: '100%', 
      }}>

    
      <h2>Map Page</h2>
      <p>This is the map PAge of my website</p>
      <MapComponent data= {[{lat:10, lng:-5}]}/>
      </Box>
  );
};

export default MapPage;