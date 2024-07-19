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

export const getUserRanking = async () => {
  try {
    const response = await instance.get(`/user/ranking`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getUserByComments = async (comments) => {
  const data = await Promise.all(comments.map(async (user) => {
    const r = await instance.get(`/user/${user.user}`);
    return r.data;
  }))
  return data;
}

