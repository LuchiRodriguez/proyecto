import axios from "axios";

export const postUser = async (username, password) => {
  const response = await axios.post(
    "http://localhost:8080/login",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "basic " + btoa(username + ":" + password),
      },
    }
  );
  return response;
};
