import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { 
  PerfilStyle, ProfileImg, ProfileInfo, 
   VideosContainer, VideoItem 
} from '../app/Styles';
import { getUserByUsername } from "../app/api/User";
import PopupProfile from '../components/PopupProfile';
import { useUserContext } from '../app/UserProvider';

const UserProfile = () => {
  const { username } = useParams();
  const [user] = useUserContext();
  const [userProfile, setUserProfile] = useState({});
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const data = await getUserByUsername(username);
      setUserProfile(data);
      setVideos(data.videos);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const openPopUp = (video) => {
    const videoArray = Object.values(videos);
    const videoIndex = videoArray.findIndex((v) => v.id === video.id);
    setSelectedVideo({ ...video, index: videoIndex });
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const renderProfileInfo = () => (
    <ProfileInfo>
      {userProfile.proposedChallenge && (
        <p>
          Challenges: <br />
          {userProfile.proposedChallenge}
        </p>
      )}
      {userProfile.challengeCompleted && (
        <p>
          Challenges: <br />
          {userProfile.challengeCompleted}
        </p>
      )}
      {userProfile.points && (
        <p>
          Points <br />
          {userProfile.points}
        </p>
      )}
    </ProfileInfo>
  );

  const renderVideos = () => (
    <VideosContainer>
      {videos?.map((video, i) => (
        <VideoItem key={i} onClick={() => openPopUp(video)}>
          <video src={video.videoUrl} />
        </VideoItem>
      ))}
    </VideosContainer>
  );

  return (
    <>
      {user.rol === "player" && (
        <div>
          <PerfilStyle>
            <ProfileImg>
              <img
                src={
                  userProfile.imagenUrl ||
                  "https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
                }
                alt=""
              />
              <p>{userProfile.rol}</p>
              <p>{userProfile.username}</p>
            </ProfileImg>
            {renderProfileInfo()}
            {renderVideos()}
          </PerfilStyle>
        </div>
      )}

      {user.rol === "watcher" && (
        <div>
          <PerfilStyle>
            <ProfileImg>
              <img
                src={
                  userProfile.imagenUrl ||
                  "https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
                }
                alt=""
              />
              <p>{userProfile.rol}</p>
              <p>{userProfile.username}</p>
            </ProfileImg>
            {renderProfileInfo()}
          </PerfilStyle>
        </div>
      )}

      {isOpen && (
        <PopupProfile video={selectedVideo} onClose={closePopup} />
      )}

      <NavBar />
    </>
  );
};

export default UserProfile;

