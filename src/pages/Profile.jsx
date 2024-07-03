import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { PerfilStyle, ProfileImg, ProfileInfo } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername, updateUserImage } from "../app/api/User";

const Profile = () => {
  const [user] = useUserContext();
  const [userProfile, setUserProfile] = useState({});

  const refetch = () => {
    getUserByUsername(user.username).then((data) => setUserProfile(data));
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    // Here you can do the server's peticion for uploading the image. 
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
        <ProfileImg>
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
          <p>{userProfile.username} </p>
        </ProfileImg>
        {user.rol === "player" && (
          <ProfileInfo>
            <p>
              Points: <br />
              {userProfile.points}
            </p>
            <p>
              Challenges: <br />3
            </p>
          </ProfileInfo>
        )}
      </PerfilStyle>
      <NavBar />
    </>
  );
};

export default Profile;
