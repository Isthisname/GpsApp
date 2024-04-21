import axios from 'axios';
import {getToken} from '../utils/auth'

const API_URL = 'http://localhost:3300';

export const listAllUsers = async () => {

    const config = {headers: {'Authorization': `Bearer ${getToken()}`}};

    try {     
      const requestUrl = `${API_URL}/user`;
  
      const response = await axios.get(requestUrl, config);
      const data=  response.data;
      
      const allListUsers =data.map(item => ({
        id:item._id,
        name: item.username
      }));
  
      return allListUsers;
  
    } catch (error) {
      throw error;
    }
  };