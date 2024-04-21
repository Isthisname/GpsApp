import axios from 'axios';
import {getToken} from '../utils/auth'

const API_URL = 'http://localhost:3300';


export const createGroup = async (data) => {

  const config = {headers: {'Authorization': `Bearer ${getToken()}`}};
  try {
    const requestUrl = `${API_URL}/group`;
    const response = await axios.post(requestUrl, {
      name: data.name,
      description: data.description
    }, config);

    if (!response.data) {
      throw new Error('La respuesta no contiene datos');
    }
    const createdGroup = response.data
    return createdGroup;
  } catch (error) {
    throw error;
  }
};



export const listGroupsByUser = async () => {

  const config = {headers: {'Authorization': `Bearer ${getToken()}`}};

  try {     
    const requestUrl = `${API_URL}/group`;
    const response = (await axios.get(requestUrl, config));
    const data=  response.data;
    const modifiedData =data.map(item => ({
      id:item._id,
      name: item.name,
      description: item.description,
      date_created:item.createdAt
    }));

    return modifiedData;

  } catch (error) {
    throw error;
  }
};



export const deleteGroup = async (data) => {
  const requestUrl = `${API_URL}/group/${data}`;
  axios.delete(requestUrl)
  .then(response => {
    console.log('La operación DELETE fue exitosa.');
    console.log('Respuesta:', response.data);
  })
  .catch(error => {
    // Si hay un error en la petición, muestra el mensaje de error
    if (error.response) {
      console.log(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      console.log('Error: No se pudo conectar al servidor.');
    } else {
      console.log(`Error: ${error.message}`);
    }
    console.error('Error:', error);
  });
  
};



export const listUsersByGroup = async (group_id) => {

  try {     
    const requestUrl = `${API_URL}/assignment/group/${group_id}`;

    const response = await axios.get(requestUrl);
    const data=  response.data;
    
    const modifiedData =data.map(item => ({
      id:item.user_id,
      name: item.name
    }));

    return modifiedData;

  } catch (error) {
    throw error;
  }
};
