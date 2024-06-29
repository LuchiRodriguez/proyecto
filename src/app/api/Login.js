import axios from "axios";
import { setAuth } from "./Challenge";

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
  //si tiene exito llamar a setAuth pasandole usuario y contraseña
  setAuth(username, password);
  return response;
};
