// import axios from 'axios';
// const instance = axios.create({ baseURL: 'http://localhost:8080/user' });

// export const setAuth = (username, password) => {
//     instance.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
// };
// // READ
// export const getUserByUsername = async (username) =>{
//     try {
//         await instance.get(`/${username}`);
//     } catch (error) {
//         console.error("Error:" + error)
//     }
    
// } 
    
import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:8080/user' });

export const setAuth = (username, password) => {
  console.log("11111111111111", username, password)
  const encodedCredentials = btoa(`${username}:${password}`);
  instance.defaults.headers.common.Authorization = `Basic ${encodedCredentials}`;
  console.log("3333333333",instance.defaults.headers.common.Authorization )
};

// READ
export const getUserByUsername = async (username) => {
  try {
    const response = await instance.get(`/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateUserImage = async (FormData) => {
  try {
    const response = await instance.post(`/upload`, FormData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}