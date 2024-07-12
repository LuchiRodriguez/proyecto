import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AppContext.Provider value={[user, setUser]}>
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
