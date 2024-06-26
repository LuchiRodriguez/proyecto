import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/user/register' });

// CREATE
export const createUser = async (obj) => await instance.post('', obj);

// READ
export const getUsers = async () => await instance.get('/');

// DELETE
export const deleteUser = async (id) => await instance.delete('/' + id)