/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useUserContext } from "./UserProvider";

const UserHook = () => {
  const [user, setUser] = useUserContext();
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      const userAux = localStorage.getItem("user");
      if (userAux) {
        setUser(JSON.parse(userAux));
      }
    }
  }, [user]);

  return { user };
};

export default UserHook;
