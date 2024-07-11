import { useEffect, useState, lazy, Suspense, useRef } from "react";
import NavBar from "../components/NavBar";
import { getChallenges, postChallengeVideo } from "../app/api/Challenge";
import {
  UserInfo,
  ChallengeInfo,
  ChallengeVideo,
  Interaction,
} from "../app/Styles";
import dislikeWatcher from "../app/img/watcherNavBar/dislike.png";
import likeImgWatcher from "../app/img/watcherNavBar/like.png";
import likeImgPlayer from "../app/img/playerNavBar/like.png";
import dislikePlayer from "../app/img/playerNavBar/dislike.png";
import { useUserContext } from "../app/UserProvider";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const Home = () => {
  const [user] = useUserContext();
  const [allChallenges, setAllChallenges] = useState([]);
  const videoRefs = useRef([]);
  const [like, setLike] = useState(false);

  const handleLike = async (ch) => {
    const formData = new FormData();
    formData.append("id", ch.id);
    formData.append("user", user.username);
    setLike(!like);

    try {
      await postChallengeVideo(ch.id);
    } catch (error) {
      console.error("Error liking:", error);
    }
  };

  const challenge = allChallenges.filter(
    (challenges) => challenges.videos !== null
  );

  useEffect(() => {
    getChallenges().then((data) => {
      setAllChallenges(data.data);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.5 } // Adjust as needed
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [challenge]);

  return (
    <>
      {challenge?.map((challenge, index) => (
        <ChallengeVideo key={challenge.id}>
          <UserInfo>
            {challenge.player.imagenUrl == null ? (
              <img src={challenge.player.imagenUrl} />
            ) : (
              <img
                src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
                alt=""
              />
            )}
            <p>{challenge.player.username}</p>
          </UserInfo>
          <ChallengeInfo>
            <p>{challenge.description}</p>
            <p className="player">
              {" "}
              Challenged by <span>{challenge.watcher.username}</span>
            </p>
          </ChallengeInfo>
          <Suspense fallback={<div>Loading video...</div>}>
            <LazyVideo
              src={challenge.videos.videoUrl}
              ref={(el) => (videoRefs.current[index] = el)}
            />
          </Suspense>
          <Interaction>
            <button onClick={() => handleLike(challenge)}>
              {user.rol === "watcher" && (
                <img src={!like ? dislikeWatcher : likeImgWatcher} alt="" />
              )}
              {user.rol === "player" && (
<<<<<<< HEAD
                <img src={!like ? dislikePlayer : likeImgPlayer} alt="" />)}
=======
                <img src={!like ? dislikePlayer : likeImgPlayer} alt="" />
              )}
>>>>>>> 4a81f7e39212f166808044923ec911e1351da504
            </button>
          </Interaction>
        </ChallengeVideo>
      ))}
      <NavBar />
    </>
  );
};

export default Home;
