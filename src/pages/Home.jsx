import { useEffect, useState, lazy, Suspense, useRef } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";
import { postVideo } from "../app/api/Video";
import {
  UserInfo,
  ChallengeInfo,
  ChallengeVideo,
  Interaction,
} from "../app/Styles";
import dislike from "../app/img/dislike.png";
import likeImg from "../app/img/like.png";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [like, setLike] = useState(false);

  const handleLike = async (ch) => {
    const formData = new FormData();
    formData.append("id", ch.id);
    setLike(!like);

    try {
      await postVideo(ch.id);
    } catch (error) {
      console.error("Error liking:", error);
    }
  };

  const challenge = allChallenges.filter(
    (challenges) => challenges.videos !== null
  );
  console.log(challenge);
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
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, []);

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
              <img src={!like ? likeImg : dislike} alt="" />
            </button>
          </Interaction>
        </ChallengeVideo>
      ))}
      <NavBar />
    </>
  );
};

export default Home;
