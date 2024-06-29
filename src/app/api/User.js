import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/user' });

export const setAuth = (username, password) => {
    instance.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
};
// READ
export const getUserByUsername = async (username) => await instance.get(`/${username}`);
    
