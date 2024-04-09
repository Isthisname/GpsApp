import { getToken } from './auth';

const API_URL = 'YOUR_API_ENDPOINT';

export const login = async (credentials) => {
  // implementation
};

export const securedRequest = async () => {
  const token = getToken();
  // implementation
};
// Example of a GET request with authentication header