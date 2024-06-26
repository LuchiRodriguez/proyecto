/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";

const UserHook = () => {
    const user = {
        "username": username,
        "email": email,
        "rol": rol,
        "points": points,
    }

    useEffect(() => {
        localStorage.getItem(user.username, user.email, user.rol, user.points);
    }, []);

    return {};
}

export default UserHook;