import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { PerfilStyle } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername, updateUserImage } from "../app/api/User";

const Perfil = () => {
  const [user] = useUserContext();
  const [userProfile, setUserProfile] = useState({});

  const refetch = () => {
    getUserByUsername(user.username).then((data) => setUserProfile(data));
  }

  useEffect(() => {
    refetch();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    // Aquí podrías hacer la petición al servidor para subir la imagen
    if (file) {
      const formData = new FormData();
      formData.append("username", userProfile.username);
      formData.append("file", file);

    await updateUserImage(formData);
    refetch();
    }
  };

  return (
    <>
      <PerfilStyle>
          <div className="entrance">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <img
            src={
              userProfile.imagenUrl
                ? userProfile.imagenUrl
                : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
            }
            alt=""
            onClick={() => document.getElementById("fileInput").click()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div>
          <p>Username : {userProfile.username} </p>
          <p>Email: {userProfile.email} </p>
          {user.rol === "player" && <p>Points: {userProfile.points}</p>}
        </div>
      </PerfilStyle>
      <NavBar />
    </>
  );
};

export default Perfil;
