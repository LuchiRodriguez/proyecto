/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useUserContext } from "./UserProvider";

const UserHook = () => {
  const [, setUser] = useUserContext();
  const user = {
    username: username,
    email: email,
    rol: rol,
    points: points,
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user");
    } else {
      const userAux = localStorage.getItem("user");
      if (userAux) setUser(userAux);
    }
  }, [user]);

  return {};
};

export default UserHook;
