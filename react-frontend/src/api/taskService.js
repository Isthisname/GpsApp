import axios from 'axios';

const API_URL = 'http://localhost:3300';
//TODO que sea el usuario de la sesion
const owner_id = "65e3d6eeea2337302af9f4f8";


export const listTaskByUser = async () => {
  try {
    const requestUrl = `${API_URL}/task/${owner_id}`;
    const response = await axios.get(requestUrl);
    const data = response.data;
    const modifiedData = data.map(item => ({
      id: item._id,
      title: item.title,
      description: item.description,
      location: item.location,
      group_id: item.group_id,
      owner_id: item.owner_id,
      target_id: item.target_id,
      status: item.status,
      createdAt: item.createdAt
    }));

    return modifiedData;

  } catch (error) {
    throw error;
  }
};

export const deleteTaskById = async (task_id) => {
  try {
    const requestUrl = `${API_URL}/task/${task_id}`;
    const response = await axios.delete(requestUrl);
    const data = response.data;

    console.log(data);
    return data;

  } catch (error) {
    throw error;
  }
};



