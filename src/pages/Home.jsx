import { useEffect, useState, lazy, Suspense, useRef } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";
import { UserInfo, ChallengeBox, ChallengeInfo } from "../app/Styles";




const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  const challenges = videos.filter((video) => video.videoUrl !== null);

  useEffect(() => {
    getChallenges().then((data) => {
      setVideos(data.data);
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
  }, [videos]);





  return (
    <>
      {challenges?.map((challenge, index) => (
        <ChallengeBox key={challenge.id}>
          <UserInfo>
            {challenge.player.imagenUrl ? (
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
              src={challenge.videoUrl}
              ref={(el) => (videoRefs.current[index] = el)}

            />
          </Suspense>
        
        </ChallengeBox>

      ))}
      <NavBar />
    </>
  );
};

export default Home;
