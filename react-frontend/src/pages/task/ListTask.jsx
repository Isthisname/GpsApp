import React, { useEffect, useState } from 'react';
import {taskAssignedToMe} from '../../api/taskService'
import DataGrid from '../../components/GridComponent';
import { Box } from '@mui/material';

const ListTask = () => {

  const [myRows, setMyRows] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const productsData = await taskAssignedToMe();
        setMyRows(productsData)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  
  const myColumns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
  ];

  return (
    <div  >
    <h2>List Tasks Page </h2>
    <Box
    width={'100%'}
    >
    <DataGrid rows={myRows} columns={myColumns} ></DataGrid>
    </Box>
  </div>
  )
};

export default ListTask;
