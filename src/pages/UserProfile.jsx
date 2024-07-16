// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import NavBar from "../components/NavBar";
// import { PerfilStyle, ProfileImg, ProfileInfo, LogoutBtn, ChangeProfileButton, PlayerProfile, WatcherProfile, VideosContainer, VideoItem } from '../app/Styles';
// import { getUserByUsername } from "../app/api/User";
// import logoutBtnWatcher from "../app/img/watcherNavBar/logout.png";
// import logoutBtnPlayer from "../app/img/playerNavBar/logout.png";
// import pencilIconWatcher from "../app/img/watcherNavBar/pencil.png";
// import pencilIconPlayer from "../app/img/playerNavBar/pencil.png";
// import PopupProfile from '../components/PopupProfile';

// const UserProfile = () => {
//   const { username } = useParams();
//   const [userProfile, setUserProfile] = useState({});
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     getUserByUsername(username).then((data) => {
//       setUserProfile(data);
//       setVideos(data.videos);
//     });
//   }, [username]);

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("username", userProfile.username);
//       formData.append("file", file);

//       // Actualiza la imagen del usuario
//       await updateUserImage(formData);
//       // Refresca los datos del perfil
//       getUserByUsername(username).then((data) => {
//         setUserProfile(data);
//       });
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser();
//     navigate("/");
//   };

//   const openPopUp = (video) => {
//     const videoArray = Object.values(videos);
//     const videoIndex = videoArray.findIndex((v) => v.id === video.id);
//     setSelectedVideo({ ...video, index: videoIndex });
//     setIsOpen(true);
//   };

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {userProfile.rol === "player" && (
//         <PlayerProfile>
//           <PerfilStyle>
//             <ProfileImg>
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//               <img
//                 src={
//                   userProfile.imagenUrl
//                     ? userProfile.imagenUrl
//                     : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
//                 }
//                 alt=""
//                 style={{ cursor: "pointer" }}
//               />
//               <p>{userProfile.rol}</p>
//               <p>{userProfile.username}</p>
//             </ProfileImg>

//             <LogoutBtn onClick={logout}>
//               <img src={logoutBtnPlayer} alt="Logout" />
//             </LogoutBtn>
//             <ChangeProfileButton onClick={() => setIsOpen(!isOpen)}>
//               <img src={pencilIconPlayer} alt="" />
//             </ChangeProfileButton>

//             <VideosContainer>
//               {videos.map((video, i) => (
//                 <VideoItem key={i} onClick={() => openPopUp(video)}>
//                   <video src={video.videoUrl} />
//                 </VideoItem>
//               ))}
//             </VideosContainer>
//           </PerfilStyle>
//         </PlayerProfile>
//       )}

//       {userProfile.rol === "watcher" && (
//         <WatcherProfile>
//           <PerfilStyle>
//             <ProfileImg>
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//               <img
//                 src={
//                   userProfile.imagenUrl
//                     ? userProfile.imagenUrl
//                     : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
//                 }
//                 alt=""
//                 style={{ cursor: "pointer" }}
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

//             <LogoutBtn onClick={logout}>
//               <img src={logoutBtnWatcher} alt="Logout" />
//             </LogoutBtn>

//             <ChangeProfileButton onClick={() => setIsOpen(!isOpen)}>
//               <img src={pencilIconWatcher} alt="" />
//             </ChangeProfileButton>
//           </PerfilStyle>
//         </WatcherProfile>
//       )}

//       {isOpen && (
//         <PopupProfile video={selectedVideo} onClose={closePopup} />
//       )}

//       <NavBar />
//     </>
//   );
// };

// export default UserProfile;


import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../app/api/User";

const UserProfile = () => {
  const { username } = useParams(); // Obtener el parámetro username de la URL
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserByUsername(username);
        setUserProfile(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Manejar el error según tu aplicación
      }
    };

    fetchUserProfile();
  }, [username]);

  return (
    <div>
      <h2>Username: {userProfile.username}</h2>
      <p>Role: {userProfile.rol}</p>
    </div>
  );
};

export default UserProfile;

