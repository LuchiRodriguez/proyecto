import { instance } from "./api";

// READ
export const getUserByUsername = async (username) => {
  try {
    const response = await instance.get(`/user/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateUserImage = async (FormData) => {
  try {
    const response = await instance.post(`/user/upload`, FormData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}