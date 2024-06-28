import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:8080/challenge" });

export const setAuth = (username, password) => {
    instance.defaults.headers.common.Authorization = 'Basic ' + btoa(username + ':' + password);
};

// CREATE
export const createChallenge = async (obj) => await instance.post("/", obj);

// READ
export const getChallenges = async () => await instance.get('');

// DELETE
export const deleteChallenge = async (id) => await instance.delete("/" + id);
