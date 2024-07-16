import dislikeWatcher from "../app/img/watcherNavBar/dislike.png";
import likeImgWatcher from "../app/img/watcherNavBar/like.png";
import likeImgPlayer from "../app/img/playerNavBar/like.png";
import dislikePlayer from "../app/img/playerNavBar/dislike.png";
import { useUserContext } from "../app/UserProvider";
import { useState } from "react";
import { postVideo } from "../app/api/Video";

const ButtonLike = () => {
  const [user] = useUserContext();
  const [like, setLike] = useState(false);

  const handleLike = async (ch) => {
    // const formData = new FormData();
    // formData.append("id", ch.id);
    // formData.append("user", user.username);
    setLike(!like);

    try {
      await postVideo({ id: ch.id });
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
