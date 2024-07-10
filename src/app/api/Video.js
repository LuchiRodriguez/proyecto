import { instance } from "./api";

export const postVideo = async (formData) =>
  await instance.post("/like", formData);
