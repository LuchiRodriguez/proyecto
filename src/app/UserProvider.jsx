/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    return (
        <AppContext.Provider value={[user, setUser]}>
            {children}
        </AppContext.Provider>
    );
}

export default UserProvider;