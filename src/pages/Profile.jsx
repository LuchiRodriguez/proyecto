import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  PerfilStyle,
  ProfileImg,
  ProfileInfo,
  LogoutBtn,
  VideosContainer,
  VideoItem,
} from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername, updateUserImage } from "../app/api/User";
import { useNavigate } from "react-router-dom";
import logoutBtnWatcher from "../app/img/watcherNavBar/logout.png";
import logoutBtnPlayer from "../app/img/playerNavBar/logout.png";
import PopupProfile from "../components/PopupProfile";

const Profile = () => {
  const [user, setUser] = useUserContext();
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const refetch = () => {
    getUserByUsername(user.username).then((data) => {
      setUserProfile(data);
      setVideos(data.videos);
    });
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
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser();
    navigate("/");
  };

  const openPopUp = (video) => {
    const videoArray = Object.values(videos);
    const videoIndex = videoArray.findIndex((v) => v.id === video.id);
    setSelectedVideo({ ...video, index: videoIndex });
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {user.rol === "player" && (
        <PerfilStyle>
          <ProfileImg onClick={handleImageClick}>
            <p>{user.rol}</p>
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
                  : "https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
              }
              alt=""
              style={{ cursor: "pointer" }}
            />

            <p>{userProfile.username}</p>
            <ProfileInfo>
              <p>
                Challenges <br />
                {userProfile.challengeCompleted}
              </p>
              <br />
              <p>
                Points <br />
                {userProfile.points}
              </p>
            </ProfileInfo>
          </ProfileImg>

          <LogoutBtn onClick={logout}>
            <img src={logoutBtnPlayer} alt="Logout" />
          </LogoutBtn>

          <VideosContainer>
            {videos.map((video, i) => {
              return (
                <VideoItem key={i} onClick={() => openPopUp(video)}>
                  <video src={video.videoUrl} />
                </VideoItem>
              );
            })}
          </VideosContainer>
        </PerfilStyle>
      )}
      {user.rol === "watcher" && (
        <PerfilStyle>
          <ProfileImg onClick={handleImageClick}>
            <p>{user.rol}</p>
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
                  : "https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
              }
              alt=""
              style={{ cursor: "pointer" }}
            />

            <p>{userProfile.username}</p>
          </ProfileImg>
          <ProfileInfo>
            <p>
              Challenges: <br />
              {userProfile.proposedChallenge}
            </p>
          </ProfileInfo>

          <LogoutBtn onClick={logout}>
            <img src={logoutBtnWatcher} alt="Logout" />
          </LogoutBtn>
        </PerfilStyle>
      )}
      {isOpen && <PopupProfile video={selectedVideo} onClose={closePopup} />}
      <NavBar />
    </>
  );
};

export default Profile;
