
/*
This setup centralizes API request logic, making  components
 cleaner and API request logic easier to manage. It abstracts away 
 the repetitive tasks of attaching tokens to requests and provides a clear 
 pattern for handling both authenticated and unauthenticated requests throughout the application.
*/


import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:3300';

// Retrieve token from local storage or any other storage mechanism
export const getToken = () => localStorage.getItem('token');


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, credentials);
    return response.data;
  } catch (error) {
   
    throw error;
  }
};

export const signup = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data; 
    } catch (error) {
      throw error.response.data; 
    }
  };

// A generic secured request function for making authenticated API calls
export const securedRequest = async ({ method, url, data }) => {
  const token = getToken();
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};

// Example usage for a GET request
export const fetchUserData = async () => {
  return await securedRequest({ method: 'get', url: '/user/data' });
};
