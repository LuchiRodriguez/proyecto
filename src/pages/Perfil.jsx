import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { PerfilStyle } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername } from "../app/api/User";

const Perfil = () => {
  const [user] = useUserContext();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserByUsername(user.username).then((data) => setUserProfile(data));
  }, [user.username]);

  return (
    <>
      <PerfilStyle>
        <div className="entrance">
          {userProfile.imagenUrl ? (
            <img src={userProfile.imagenUrl} alt="" />
          ) : (
            <img
              src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
              alt=""
            />
          )}
        </div>
        <div>
          <p>Username : {userProfile.username} </p>
          <p>Email: {userProfile.email} </p>
          <p>Points: {userProfile.points}</p>
        </div>
      </PerfilStyle>
      <NavBar />
    </>
  );
};

export default Perfil;
