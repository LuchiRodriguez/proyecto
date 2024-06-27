/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useUserContext } from "./UserProvider";

const UserHook = () => {
  const [user, setUser] = useUserContext();
  useEffect(() => {
    // if (user) {
    //   console.log("3333333333333333");
    //   localStorage.setItem("user");
    // } else {
    //   console.log("44444444444444444");
    //   const userAux = localStorage.getItem("user");
    //   console.log("555555555555", userAux);
    //   if (userAux) {
    //     console.log("6666666666666");
    //     setUser(userAux);
    //   }
    // }
  }, [user]);

  console.log("22222222222", user);
  return { user };
};

export default UserHook;
