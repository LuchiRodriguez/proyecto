import { instance } from "./api";

export const postVideo = async (obj) =>{
  console.log(obj)
  
  const data = await instance.post("/like", obj)
  console.log(data)
} 



export const postComments = async (obj) =>
  await instance.post("/comments", obj);
