import { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import { PerfilStyle, ProfileImg, ProfileInfo, LogoutBtn, ChangeProfileButton, PlayerProfile, WatcherProfile, VideosContainer, VideoItem } from '../app/Styles';
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername, updateUserImage } from "../app/api/User";
import { useNavigate } from "react-router-dom";
import logoutBtnWatcher from "../app/img/watcherNavBar/logout.png";
import logoutBtnPlayer from "../app/img/playerNavBar/logout.png";
import pencilIconWatcher from "../app/img/watcherNavBar/pencil.png";
import pencilIconPlayer from "../app/img/playerNavBar/pencil.png";
import PopupProfile from '../components/PopupProfile';


const Profile = () => {
  const [user, setUser] = useUserContext();
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const refetch = () => {
    getUserByUsername(user.username).then((data) => {
      setUserProfile(data)
      console.log(data.videos)
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

  const logout = () => {
    localStorage.removeItem("user");
    setUser();
    navigate("/");
  };

  const openPopUp = (video) => {
    setSelectedVideo(video);
    setIsOpen(true);
  }

  const closePopup = () => {
    setIsOpen(false);
  }

  return (
    <>
      {user.rol === "player" && <PlayerProfile>
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

          <LogoutBtn onClick={logout}>
            <img src={logoutBtnPlayer} alt="Logout" />
          </LogoutBtn>
          <ChangeProfileButton onClick={() => setIsOpen(!isOpen)}>
            <img src={pencilIconPlayer} alt="" />
          </ChangeProfileButton>

          <VideosContainer>
            {videos.map((video, i) => {
              return (
                <VideoItem key={i} onClick={() => openPopUp(video)} >
                  <video
                    src={video.videoUrl}
                  />

                </VideoItem>
              )
            }
            )}
          </VideosContainer>

        </PerfilStyle>
      </PlayerProfile>}
      {user.rol === "watcher" && <WatcherProfile>
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
          <ProfileInfo>
            <p>
              Challenges: <br />
              {userProfile.proposedChallenge}
            </p>
          </ProfileInfo>

          <LogoutBtn onClick={logout}>
            <img src={logoutBtnWatcher} alt="Logout" />
          </LogoutBtn>

          <ChangeProfileButton onClick={() => setIsOpen(!isOpen)}>
            <img src={pencilIconWatcher} alt="" />
          </ChangeProfileButton>
        </PerfilStyle>
      </WatcherProfile>}

      {isOpen && (
        <PopupProfile
          video={selectedVideo}
          onClose={closePopup}
        />
      )}
      <NavBar />
    </>
  );
};

export default Profile;
