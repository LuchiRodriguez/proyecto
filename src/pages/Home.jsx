import { Link } from "react-router-dom";  // Importa Link para la navegación
import { useEffect, useState, lazy, Suspense, useRef } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";
import ButtonLike from "../components/ButtonLike";
import NewComment from "../components/NewComment";
import { UserInfo, ChallengeInfo, ChallengeVideo, Interaction } from "../app/Styles";
import PlayerComment from "../app/img/playerNavBar/playerDiscomment.png";
import WatcherComment from "../app/img/watcherNavBar/watcherDiscommet.png";
import { useUserContext } from "../app/UserProvider";

import { useUserContext } from "../app/UserProvider";
import ChallengeWithVideo from "../components/ChallengeWithVideo";

const Home = () => {
  const [user] = useUserContext();
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (user) {
      refetch();
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
            {challenge.player.imagenUrl ? (
              <img src={challenge.player.imagenUrl} alt="profile" />
            ) : (
              <img
                src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
                alt="default"
              />
            )}
            <Link to={`/profile/${challenge.player.username}`}>  {/* Enlace al perfil del usuario */}
              <p>{challenge.player.username}</p>
            </Link>
          </UserInfo>
          <ChallengeInfo>
            <p>{challenge.description}</p>
            <p className="player">
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
            </button>
          </Interaction>
          <NewComment showComments={showComments} challenge={challenge} />
        </ChallengeVideo>
      ))}
      <NavBar />
    </>
  )
};

export default Home;
