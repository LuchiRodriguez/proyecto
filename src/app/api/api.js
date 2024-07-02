import axios from "axios";

export const instance = axios.create({ baseURL: "http://localhost:8080" });

export const setAuth = async (username, password) => {
    const token = btoa(`${username}:${password}`);
    instance.defaults.headers.common.Authorization = `basic ${token}`;

    console.log('uyuyuyuyuy', username, password)
    console.log('3333333333333333', instance.defaults.headers.common)

};