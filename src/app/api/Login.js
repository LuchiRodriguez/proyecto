import axios from 'axios';

export const postUser = async (username, password) => {
  axios.post("http://localhost:8080/login",{},
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: "basic " + btoa(username + ":" + password),
    },
  }
).then((response) => console.log(response),(error) => console.log(error))
}