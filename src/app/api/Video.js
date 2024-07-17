import { instance } from "./api";

export const postLike = async (obj) => await instance.post("/like", obj);

export const postComments = async (obj) =>
  await instance.post("/comments", obj);
