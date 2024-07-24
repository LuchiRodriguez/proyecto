import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { PerfilStyle, ProfileImg, ProfileInfo, PlayerProfile, WatcherProfile, VideosContainer, VideoItem } from '../app/Styles';
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
 
  useEffect(() => {
    getUserByUsername(username).then((data) => {
      setUserProfile(data);
      setVideos(data.videos);
    });
  }, [username]);

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
        <PlayerProfile>
          <PerfilStyle>
            <ProfileImg>
              <img
                src={
                  userProfile.imagenUrl
                    ? userProfile.imagenUrl
                    : "https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
                }
                alt=""
              />
              <p>{userProfile.rol}</p>
              <p>{userProfile.username}</p>
            </ProfileImg>
            <ProfileInfo>
              {userProfile.proposedChallenge ?
                <p>
                  Challenges: <br />
                  {userProfile.proposedChallenge}
                </p> : null}
              {userProfile.challengeCompleted ?
                <p>
                  Challenges: <br />
                  {userProfile.challengeCompleted}
                </p> : null}
              <br />
              {userProfile.points ? <p>
                Points <br />
                {userProfile.points}
              </p> : null}
            </ProfileInfo>
            <VideosContainer>
              {videos?.map((video, i) => (
                <VideoItem key={i} onClick={() => openPopUp(video)}>
                  <video src={video.videoUrl} />
                </VideoItem>
              ))}
            </VideosContainer>
          </PerfilStyle>
        </PlayerProfile>
      )}

      {user.rol === "watcher" && (
        <WatcherProfile>
          <PerfilStyle>
            <ProfileImg>
              <img
                src={
                  userProfile.imagenUrl
                    ? userProfile.imagenUrl
                    : "https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
                }
                alt=""
              />
              <p>{userProfile.rol}</p>
              <p>{userProfile.username}</p>
            </ProfileImg>
            <ProfileInfo>

              {userProfile.challengeCompleted ? <p>
                Challenges: <br />
                {userProfile.challengeCompleted}
              </p> : null}

              {userProfile.proposedChallenge ? <p>
                Challenges: <br />
                {userProfile.proposedChallenge}
              </p> : null}

              {userProfile.points ? <p>
                Points <br />
                {userProfile.points}
              </p> : null}
            </ProfileInfo>
          </PerfilStyle>
        </WatcherProfile>
      )}

      {isOpen && (
        <PopupProfile video={selectedVideo} onClose={closePopup} />
      )}

      <NavBar />
    </>
  );
};

export default UserProfile;