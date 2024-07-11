import { useEffect, useState, useRef } from 'react';
import NavBar from "../components/NavBar";
import { PerfilStyle, ProfileImg, ProfileInfo, LogoutBtn, ChangeProfileButton, PlayerProfile, WatcherProfile, VideosContainer, VideoItem } from '../app/Styles';
import { useUserContext } from "../app/UserProvider";
import { getUserByUsername, updateUserImage } from "../app/api/User";
import { useNavigate } from "react-router-dom";
import logoutBtnWatcher from "../app/img/watcherNavBar/logout.png";
import logoutBtnPlayer from "../app/img/playerNavBar/logout.png";
import pencilIconWatcher from "../app/img/watcherNavBar/pencil.png";
import pencilIconPlayer from "../app/img/playerNavBar/pencil.png";
import { getChallenges } from "../app/api/Challenge";
import LazyVideo from "../components/Lazyvideo";


const Profile = () => {
  const [user, setUser] = useUserContext();
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const videoRefs = useRef([]);
  const refetch = () => {
    getUserByUsername(user.username).then((data) => setUserProfile(data));
  };



  useEffect(() => {
    refetch();


    const fetchChallenges = async () => {
      try {
        const response = await getChallenges();
        setChallenges(response.data.filter(ch => ch.player.username === user.username));
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }

    fetchChallenges();
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
          {isOpen}

          <VideosContainer>
            {challenges.map((challenge, i) => (
              <VideoItem key={i}>
                <div>
                  src={challenge.videos.videoUrl}
                  ref={(el) => (videoRefs.current[i] = el)}
                </div>
              </VideoItem>
            ))}
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
          {isOpen}
        </PerfilStyle>
      </WatcherProfile>}


      <NavBar />
    </>
  );
};

export default Profile;
