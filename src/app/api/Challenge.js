import axios from "axios";
import { instance } from "./api";

// CREATE
export const createChallenge = async (formData) =>
  await instance.post("/challenge", formData);

// READ
export const getChallenges = async () => {
const data = await instance.get("/challenge");
return data.data;
} 

// DELETE
export const deleteChallenge = async (id) =>
  await instance.delete(`/challenge/${id}`);

// UPDATE
export const updateChallenge = async (id, username) =>
  await instance.put(`/challenge/${id}`, { username });

// CANCEL
export const cancelChallenge = async (id) => await instance.patch(`/challenge/${id}`);

// UPLOAD VIDEO
// export const postChallengeVideo = async (id, file) => await instance.post(`/${id}/upload`, file);
export const postChallengeVideo = async (formData) =>
  await instance.post("/challenge/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
