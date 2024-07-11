import { instance } from "./api";

// CREATE
export const createChallenge = async (formData) => await instance.post("/challenge", formData);

// READ
export const getChallenges = async () => await instance.get("/challenge");

// READ (by ID)
export const getChallengeById = async (id) => await instance.get(`/challenge/${id}`);

// DELETE
export const deleteChallenge = async (id) => await instance.delete(`/challenge/${id}`);

// UPDATE
export const updateChallenge = async (id, username) => await instance.put(`/challenge/${id}`, { username });

// UPLOAD VIDEO
// export const postChallengeVideo = async (id, file) => await instance.post(`/${id}/upload`, file);
export const postChallengeVideo = async (formData) => await instance.post('/challenge/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});