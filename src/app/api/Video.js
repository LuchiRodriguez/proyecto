import { instance } from "./api";

export const postVideo = async () => await instance.post("/videos");
