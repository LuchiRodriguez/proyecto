import { useEffect, useState } from "react";
import { useUserContext } from "../app/UserProvider";
import { postVideo, getVideoById } from '../app/api/Video';
import dislikeWatcher from "../app/img/watcherNavBar/dislike.png";
import likeImgWatcher from "../app/img/watcherNavBar/like.png";
import likeImgPlayer from "../app/img/playerNavBar/like.png";
import dislikePlayer from "../app/img/playerNavBar/dislike.png";
<<<<<<< HEAD
import { useUserContext } from "../app/UserProvider";
import { useEffect, useState } from "react";
import { postVideo, getVideoById } from '../app/api/Video';

const ButtonLike = ({ videoId, refetch }) => {
  const [user] = useUserContext();
  const [like, setLike] = useState(false);
  const [meGusta, setMeGusta] = useState([]);
=======

const ButtonLike = ({ videoId, refetch}) => {
  const [user] = useUserContext();
  const [like, setLike] = useState(false);
>>>>>>> master

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await getVideoById(videoId);
        const meGustas = videoData.data.meGustas;

        // Verificar si el usuario actual ha dado "me gusta"
        const userHasLiked = meGustas.some(meGusta => {
          const username = typeof meGusta.user === 'string' ? meGusta.user : meGusta.user.username;
          return username === user.username;
        });

        setLike(userHasLiked);
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
<<<<<<< HEAD
      < button type="submit">
        {user.rol === "watcher" && (
          <img src={!like ? dislikeWatcher : likeImgWatcher} alt="" />
        )}
        {user.rol === "player" && (
          <img src={!like ? dislikePlayer : likeImgPlayer} alt="" />
=======
      <button type="submit">
        {user.rol === "watcher" ? (
          <img src={like ? likeImgWatcher : dislikeWatcher} alt="like-dislike" />
        ) : (
          <img src={like ? likeImgPlayer : dislikePlayer} alt="like-dislike" />
>>>>>>> master
        )}
      </button>
    </form>
  );
};

export default ButtonLike;

