import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/login' });

// READ
export const postUsers = async () => await instance.post('/');