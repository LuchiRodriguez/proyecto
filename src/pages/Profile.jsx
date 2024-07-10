import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { PerfilStyle, ProfileImg, ProfileInfo, LogoutBtn, ChangeProfileButton } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername, updateUserImage } from "../app/api/User";
import { useNavigate } from "react-router-dom";
import logoutBtn from "../app/img/logout.png";
import pencilIcon from "../app/img/pencil.png";

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
        {user.rol === "player" && (
          <ProfileInfo>
            <p>
              Points: <br />
              {userProfile.points}
            </p>
            <p>
              Challenges: <br />
              {userProfile.challengeCompleted}
            </p>
          </ProfileInfo>
        )}
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
        <img src={pencilIcon} alt="" />
      </ChangeProfileButton>
      <NavBar />
    </>
  );
};

export default Profile;
