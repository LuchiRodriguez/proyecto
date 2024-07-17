import { instance } from "./api";

// CREATE
export const createComment = async (formData) =>
    await instance.post("/comments", formData);