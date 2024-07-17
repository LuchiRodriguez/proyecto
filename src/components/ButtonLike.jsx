import dislikeWatcher from "../app/img/watcherNavBar/dislike.png";
import likeImgWatcher from "../app/img/watcherNavBar/like.png";
import likeImgPlayer from "../app/img/playerNavBar/like.png";
import dislikePlayer from "../app/img/playerNavBar/dislike.png";
import { useUserContext } from "../app/UserProvider";
import { useState } from "react";
import { postLike } from "../app/api/Video";

const ButtonLike = ({ videoId }) => {
  const [user] = useUserContext();
  const [like, setLike] = useState(false);

  const handleLike = async () => {
    const formData = new FormData();
    formData.append("user", user.username);
    formData.append("video", videoId);
    setLike(!like);

    try {
      await postLike(formData);
    } catch (error) {
      console.error("Error liking:", error);
    }
  };
  return (
    <button onClick={(e) => handleLike(e)}>
      {user.rol === "watcher" && (
        <img src={!like ? dislikeWatcher : likeImgWatcher} alt="" />
      )}
      {user.rol === "player" && (
        <img src={!like ? dislikePlayer : likeImgPlayer} alt="" />
      )}
    </button>
  );
};

export default ButtonLike;
