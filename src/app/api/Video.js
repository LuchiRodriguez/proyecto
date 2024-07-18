import { instance } from "./api";

<<<<<<< HEAD
export const postLike = async (obj) => await instance.post("/like", obj);
=======
export const postVideo = async (obj) =>{
  const data = await instance.post("/like", obj)
  console.log(data)
} 
>>>>>>> master

export const getVideoById = async (id) => await instance.get(`/video/${id}`);
