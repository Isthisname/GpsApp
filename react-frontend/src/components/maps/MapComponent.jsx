import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';


const MapComponent = ({ data }) => {

  const [infowindowOpen, setInfowindowOpen] = useState(false);

  console.log(data)
  const pos = { lat: 10, lng: -4 };

  return (
     <Box  sx={{
        height: '100vh',
        width: '100%', 
      }}>
      <APIProvider apiKey={'AIzaSyBhJ6Mz2-NBrPZeuXtlaROqHrT2hN0aKVg'}>
        <Map
          defaultZoom={8}
          defaultCenter={{ lat:40.5486807849397, lng:-111.9137212403442 }}
          gestureHandling={'greedy'}
          style={{ width: '100%', height: '100%' }} 
        >

          {data.map((location, index) => (
            <Marker
              position={location}
              clickable={true}
              onClick={() => setInfowindowOpen(true)}
              title={'clickable google.maps.Marker'}
            />
          ))}

        </Map>

      </APIProvider>
      </Box>
  

  );
}

export default MapComponent;


