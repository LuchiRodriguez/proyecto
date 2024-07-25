import axios from "axios";
import { setAuth } from "./api";

// export const postUser = async (username, password) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/login",
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "basic " + btoa(username + ":" + password),
//         },
//       }
//     );

export const postUser = async (username, password) => {
  try {
    const response = await axios.post(
      "https://aimapp-14a72bacae3f.herokuapp.com/login",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "basic " + btoa(username + ":" + password),
        },
      }
    );

    setAuth(username, password);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Username or password incorrect");
    }
    // Re-throw any other errors
    throw error;
  }
};
