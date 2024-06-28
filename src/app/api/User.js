import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/user' });

// READ
export const getUserById = async (id) => await instance.get(`/${id}`);