import axios from "axios";

// export const instance = axios.create({ baseURL: "http://localhost:8080" });
export const instance = axios.create({ baseURL: "https://aimapp-14a72bacae3f.herokuapp.com" });

export const setAuth = async (username, password) => {
    const token = btoa(`${username}:${password}`);
    instance.defaults.headers.common.Authorization = `basic ${token}`;
};