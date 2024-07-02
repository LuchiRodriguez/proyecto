import { useEffect} from "react";
import { useUserContext } from "./UserProvider";
import { setAuth } from "./api/User"; // Importamos la función correcta

const UserHook = () => {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user.username, user.password);
    } else {
      const userAux = JSON.parse(localStorage.getItem("user"));
      if (userAux) {
        setUser(userAux);
      }
    }
  }, [user]);

  return { user };
};

export default UserHook;

