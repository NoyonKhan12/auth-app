import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const register = async (userData: { email: string; password: string; firstName: string; lastName: string; mobileNumber: string }) => {
  return await axios.post(`${API_URL}/register`, userData);
};

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const activate = async (token: string) => {
  return await axios.get(`${API_URL}/activate/${token}`);
};

export default {
  register,
  login,
  activate,
};
