import axios from "axios";
export const instance = axios.create({ baseURL: "http://localhost:8080" });

export const setAuth = (username, password) => {
  instance.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
};

// CREATE
export const createChallenge = async (formData) => await instance.post("/challenge", formData);

// READ
export const getChallenges = async () => {
  console.log('33333333333333', instance.defaults.headers.common.Authorization)
  await instance.get('/challenge');

}

// DELETE
export const deleteChallenge = async (id) => await instance.delete("/challenge" + id);

// UPDATE
export const updateChallenge = async (id, username) => await instance.put(`/challenge/${id}`, { username });

// UPLOAD VIDEO
// export const postChallengeVideo = async (id, file) => await instance.post(`/${id}/upload`, file);
export const postChallengeVideo = async (id, formData) => await instance.post(`/${id}/upload`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});