import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  PerfilStyle,
  ProfileImg,
  ProfileInfo,
  LogoutBtn,
  ChangeProfileButton,
  PlayerProfile,
} from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername, updateUserImage } from "../app/api/User";
import { useNavigate } from "react-router-dom";
import logoutBtn from "../app/img/logout.png";
import pencilIconWatcher from "../app/img/watcherNavBar/pencil.png";
import pencilIconPlayer from "../app/img/playerNavBar/pencil.png";

const Profile = () => {
  const [user, setUser] = useUserContext();
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  const refetch = () => {
    getUserByUsername(user.username).then((data) => setUserProfile(data));
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("username", userProfile.username);
      formData.append("file", file);

      await updateUserImage(formData);
      refetch();
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser();
    navigate("/");
  };

  return (
    <>
      {user.rol === "player" && <PlayerProfile></PlayerProfile>}
      {user.rol === "watcher" && <WatcherProfile></WatcherProfile>}
      <PerfilStyle>
        <ProfileImg>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
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
            style={{ cursor: "pointer" }}
          />

          <p>{user.rol}</p>
          <p>{userProfile.username}</p>
        </ProfileImg>
        {user.rol === "watcher" && (
          <ProfileInfo>
            <p>
              Challenges: <br />
              {userProfile.proposedChallenge}
            </p>
          </ProfileInfo>
        )}
      </PerfilStyle>
      <LogoutBtn onClick={logout}>
        <img src={logoutBtn} alt="Logout" />
      </LogoutBtn>
      <ChangeProfileButton onClick={() => console.log()}>
        {user.rol === "watcher" && <img src={pencilIconWatcher} alt="" />}
        {user.rol === "player" && <img src={pencilIconPlayer} alt="" />}
      </ChangeProfileButton>
      <NavBar />
    </>
  );
};

export default Profile;
