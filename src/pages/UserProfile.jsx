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
  console.log(userProfile)
  useEffect(() => {
    getUserByUsername(username).then((data) => {
      setUserProfile(data);
      setVideos(data.videos);
    });
  }, [username]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("username", userProfile.username);
      formData.append("file", file);

      await updateUserImage(formData);

      getUserByUsername(username).then((data) => {
        setUserProfile(data);
      });
    }
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
  //   return (
  //     <>
  //       {user.rol === "player" && userProfile.rol === "watcher" && (
  //         <WatcherProfile>
  //           <PerfilStyle>
  //             <ProfileImg>
  //               <img
  //                 src={
  //                   userProfile.imagenUrl
  //                     ? userProfile.imagenUrl
  //                     : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
  //                 }
  //                 alt=""
  //               />
  //               <p>{userProfile.rol}</p>
  //               <p>{userProfile.username}</p>
  //             </ProfileImg>
  //             <ProfileInfo>
  //               <p>
  //                 Challenges: <br />
  //                 {userProfile.proposedChallenge}
  //               </p>
  //             </ProfileInfo>
  //           </PerfilStyle>
  //         </WatcherProfile>
  //       )}

  //       {user.rol === "watcher" && userProfile.rol === "player" && (
  //         <PlayerProfile>
  //           <PerfilStyle>
  //             <ProfileImg>
  //               <img
  //                 src={
  //                   userProfile.imagenUrl
  //                     ? userProfile.imagenUrl
  //                     : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
  //                 }
  //                 alt=""
  //               />
  //               <p>{userProfile.rol}</p>
  //               <p>{userProfile.username}</p>
  //             </ProfileImg>
  //             <ProfileInfo>
  //               <p>
  //                 Challenges <br />
  //                 {userProfile.challengeCompleted}
  //               </p>
  //               <br />
  //               <p>
  //                 Points <br />
  //                 {userProfile.points}
  //               </p>
  //             </ProfileInfo>
  //             <VideosContainer>
  //               {videos?.map((video, i) => (
  //                 <VideoItem key={i} onClick={() => openPopUp(video)}>
  //                   <video src={video.videoUrl} />
  //                 </VideoItem>
  //               ))}
  //             </VideosContainer>
  //           </PerfilStyle>
  //         </PlayerProfile>
  //       )}

  //       {isOpen && (
  //         <PopupProfile video={selectedVideo} onClose={closePopup} />
  //       )}

  //       <NavBar />
  //     </>
  //   );
  // }
  // export default UserProfile;



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
                    : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
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
                    : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
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