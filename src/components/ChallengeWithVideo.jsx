import { Suspense, useState, lazy, useRef, useEffect } from "react";
import ButtonLike from "./ButtonLike";
import NewComment from "./NewComment";
import {
  UserInfo,
  ChallengeInfo,
  ChallengeVideo,
  Interaction,
} from "../app/Styles";
import PlayerComment from "../app/img/playerNavBar/playerDiscomment.png";
import WatcherComment from "../app/img/watcherNavBar/watcherDiscommet.png";
import { useUserContext } from "../app/UserProvider";
import shareW from "../app/img/watcherNavBar/shareWatcher.png";
import shareP from "../app/img/playerNavBar/sharePlayer.png";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const ChallengeWithVideo = ({ challenge, index, refetch }) => {
  const [user] = useUserContext();
  const [showComments, setShowComments] = useState(false);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  // Cuando despleguemos la app, y tengamos URL fija, actualizar y descomentar el código de acá abajo
  // const url = "https://www-example-com.cdn.ampproject.org/c/s/www.example.com";

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

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
console.log(challenge)
  return (
    <>
        <ChallengeVideo key={challenge.id}>
          <UserInfo>
            {challenge.player.imagenUrl !== null ? 
              <img src={challenge.player.imagenUrl}/>
             : 
              <img
                src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
                alt=""
              />
            }
            {challenge.player.username ? <p>{challenge.player.username}</p> : <p>{challenge.player}</p>}
          </UserInfo>
          <ChallengeInfo>
            <p>{challenge.description}</p>
            <p className="player">
              {" "}
              Challenged by {challenge.watcher.username ? <span>{challenge.watcher.username}</span> : <span>{challenge.watcher}</span>}
            </p>
          </ChallengeInfo>
          <Suspense fallback={<div>Loading video...</div>}>
            <LazyVideo
              src={challenge.videos.videoUrl}
              ref={(el) => (videoRefs.current[index] = el)}
            />
        </Suspense>
        <ChallengeInfo>
          <p onClick={() => navigate("/visit/" + challenge.id)}>
            {challenge.description}
          </p>
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
          <ButtonLike videoId={challenge.videos.id} refetch={refetch} />
          <p>{challenge.videos.meGustas.length} Likes</p>
          <button onClick={() => setShowComments(!showComments)}>
            {user.rol === "watcher" ? (
              <img src={WatcherComment} alt="" />
            ) : (
              <img src={PlayerComment} alt="" />
            )}
          </button>
          <CopyToClipboard
            onCopy={() =>
              handleCopy("http://localhost:5173/visit/" + challenge.id)
            }
          >
            <button>
              {user.rol === "watcher" ? (
                <img src={shareW} alt="" />
              ) : (
                <img src={shareP} alt="" />
              )}
            </button>
          </CopyToClipboard>
        </Interaction>
        <NewComment
          comments={challenge.videos.comments}
          setShowComments={setShowComments}
          showComments={showComments}
          videoChallenge={challenge.videos.id}
          refetch={refetch}
        />
      </ChallengeVideo>
    </>
  );
};

export default ChallengeWithVideo;
