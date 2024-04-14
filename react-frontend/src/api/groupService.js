import axios from 'axios';

const API_URL = 'http://localhost:3300';

//TODO que sea el usuario de la sesion
const owner_id = "65e3d6eeea2337302af9f4f8";


export const createGroup = async (data) => {
  try {
    const requestUrl = `${API_URL}/group`;
    const response = await axios.post(requestUrl, {
      name: data.name,
      owner_id: owner_id,
      description: data.description
    });

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
  try {     
    const requestUrl = `${API_URL}/group/${owner_id}`;
    const response = await axios.get(requestUrl);
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