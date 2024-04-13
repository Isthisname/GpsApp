import axios from 'axios';

const API_URL = 'http://localhost:3300';

export const listTaskByUser = async () => {
  try { 
    //TODO que sea el usuario de la sesion
    const owner_id = "65e3d6eeea2337302af9f4f8";
    const requestUrl = `${API_URL}/task/${owner_id}`;
    const response = await axios.get(requestUrl);
    const data=  response.data;
    const modifiedData =data.map(item => ({
      id:item._id,
      title: item.title,
      description: item.description,
      location:item.location
    }));

    return modifiedData;

  } catch (error) {
    throw error;
  }
};