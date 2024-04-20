import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';


const MapHandlerSelect = ({onClick}) => {

  const [infowindowOpen, setInfowindowOpen] = useState(false);

  const [pos, setPos] = useState({lat:40.5486807849397, lng:-111.9137212403442 });

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
          onClick={e =>{
            setPos(e.detail.latLng);
            onClick({
              latitude:e.detail.latLng.lat,
              longitude:e.detail.latLng.lng
            });
          }
          }
        >

            <Marker
              position={pos}
              clickable={true}
              title={'clickable google.maps.Marker'}
            />
         
        </Map>

      </APIProvider>
      </Box>
  

  );
}

export default MapHandlerSelect;


