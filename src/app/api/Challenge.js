import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:8080/challenge" });

export const setAuth = (username, password) => {
    instance.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
};

// CREATE
export const createChallenge = async (formData) => await instance.post("", formData);

// READ
export const getChallenges = async () => await instance.get('');

// DELETE
export const deleteChallenge = async (id) => await instance.delete("/" + id);

// UPDATE
export const updateChallenge = async (id, username) => await instance.put(`/${id}`, {username});

// UPLOAD VIDEO
// export const postChallengeVideo = async (id, file) => await instance.post(`/${id}/upload`, file);
export const postChallengeVideo = async (id, formData) => await instance.post(`/${id}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });