import { useEffect, useState } from "react";
import { useUserContext } from "./UserProvider";
import { setAuth } from "./api/User"; // Importamos la función correcta

const UserHook = () => {
  const [user, setUser] = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  }, [setUser, user]);

  useEffect(() => {
    if (username && password) {
      setAuth(username, password);
    }
  }, [username, password]);

  return { user };
};

export default UserHook;

