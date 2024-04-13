import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import MapComponent from "../components/maps/MapComponent"


export default function GridComponent({ rows, columns }) {

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = (e) => {
    const listaPos = rows.filter(row => e.includes(row.id)).map(row => row.location);
    const data2 = listaPos.map(item => ({
      lat: item.latitude,
      lng: item.longitude
    }));

    setSelectedItems(data2);

  };

  return (


    <Box
      sx={{
        display: 'flex', // Utiliza un modelo de caja flexible
        height: '100vh', // Establece la altura al 100% de la altura de la ventana (viewport)
        width:'100%'
      }}
    >
      {/* Primera columna */}
      <Box sx={{ flex: '15%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
        />
      </Box>

      {/* Segunda columna */}
      <Box sx={{ flex: '70%', width: '1200px' }}>
        
        <MapComponent data={selectedItems} />
      </Box>
    </Box>


  );
}