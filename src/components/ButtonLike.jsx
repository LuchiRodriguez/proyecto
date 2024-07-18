import dislikeWatcher from "../app/img/watcherNavBar/dislike.png";
import likeImgWatcher from "../app/img/watcherNavBar/like.png";
import likeImgPlayer from "../app/img/playerNavBar/like.png";
import dislikePlayer from "../app/img/playerNavBar/dislike.png";
import { useUserContext } from "../app/UserProvider";
import { useEffect, useState } from "react";
import {postVideo, getVideoById} from '../app/api/Video';
import {getUserByUsername} from '../app/api/User';

const ButtonLike = ({videoId, refetch}) => {
  const [user] = useUserContext();
  const [like, setLike] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [meGusta, setMeGusta] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await getUserByUsername(user.username);
        setUserProfile(userProfileData);
  
        const videoData = await getVideoById(videoId);
        setMeGusta(videoData.data.meGustas);
  
        if (userProfileData.meGustas.includes(videoId)) {
          setLike(true);
        } else {
          setLike(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [user.username, videoId]);

  const handleLike = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", user.username);
    formData.append("video", videoId);

    try {
      await postVideo(formData);
      setLike(!like);
      refetch();
    } catch (error) {
      console.error("Error liking:", error);
    }
  };
  return (
 <form onSubmit={handleLike}>
     <button type="submit">
      {user.rol === "watcher" && (
        <img src={!like ? dislikeWatcher : likeImgWatcher} alt="" />
      )}
      {user.rol === "player" && (
        <img src={!like ? dislikePlayer : likeImgPlayer} alt="" />
      )}
    </button>
 </form>
  );
};

export default ButtonLike;
