
import { instance } from './Challenge';

// CREATE
export const createUser = async (obj) => await instance.post('/user/register', obj);

// READ
export const getUsers = async () => await instance.get('/user');

// DELETE
export const deleteUser = async (id) => await instance.delete('/user' + id)