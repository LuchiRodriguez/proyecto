/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useUserContext } from "./UserProvider";
import { setAuth } from "./api/Challenge";

const UserHook = () => {
  const [user, setUser] = useUserContext();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUsername(user.username);
      setPassword(user.password);
    } else {
      const userAux = JSON.parse(localStorage.getItem("user"));
      if (userAux) {
        setUser(userAux);
        setUsername(userAux.username);
        setPassword(userAux.password);
      }
    }
    setAuth(username, password);
  }, [user]);

  return { user };
};

export default UserHook;
