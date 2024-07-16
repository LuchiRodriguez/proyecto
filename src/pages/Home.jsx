import { useEffect, useState, lazy, Suspense, useRef } from "react";
import NavBar from "../components/NavBar";
import { getChallenges, postChallengeVideo } from "../app/api/Challenge";
import { UserInfo, ChallengeInfo, ChallengeVideo, Interaction } from "../app/Styles";
import dislikeWatcher from "../app/img/watcherNavBar/dislike.png";
import likeImgWatcher from "../app/img/watcherNavBar/like.png";
import likeImgPlayer from "../app/img/playerNavBar/like.png";
import dislikePlayer from "../app/img/playerNavBar/dislike.png";
import { useUserContext } from "../app/UserProvider";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const Home = () => {
  const [user] = useUserContext();
  const [showComments, setShowComments] = useState(false);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const videoRefs = useRef([]);
  useEffect(() => {
    if (user) {
      getChallenges().then((data) => {
        const filteredChallenges = data.filter(
          (challenges) => challenges.videos !== null
        );
        setFilteredChallenges(filteredChallenges);
      });
    }
  }, [user]);

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
  }, [filteredChallenges]);

  return (
    <>
      {filteredChallenges?.map((challenge, index) => (
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
            <ButtonLike />
            <button onClick={() => setShowComments(true)}>
              {user.rol === "watcher" ? (
                <img src={WatcherComment} alt="" />
              ) : (
                <img src={PlayerComment} alt="" />
              )}
              {user.rol === "player" && (
                <img src={!like ? dislikePlayer : likeImgPlayer} alt="" />
              )}
            </button>
          </Interaction>
          <NewComment showComments={showComments} challenge={challenge} />
        </ChallengeVideo>
      ))}
      <NavBar />
    </>
  );
};

export default Home;
