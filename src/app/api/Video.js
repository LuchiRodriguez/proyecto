import { instance } from "./api";

export const postVideo = async (obj) =>{
  const data = await instance.post("/like", obj)
  console.log(data)
} 

export const getVideoById = async (id) => await instance.get(`/video/${id}`);
