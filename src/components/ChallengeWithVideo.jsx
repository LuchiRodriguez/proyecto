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
import ShareButton from "./ShareButton";
import { Link, useNavigate } from "react-router-dom";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const ChallengeWithVideo = ({ challenge, index, refetch }) => {
  const [user] = useUserContext();
  const [showComments, setShowComments] = useState(false);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  // Cuando despleguemos la app, y tengamos URL fija, actualizar y descomentar el código de acá abajo
  const url = "http://localhost:5173/visit/";

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
    <ChallengeVideo>
      <UserInfo>
        {challenge.player.imagenUrl !== null ? (
          <img src={challenge.player.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
            alt=""
          />
        )}
        <div>
          <Link to={`/profile/${challenge.player.username}`}>
            {challenge.player.username ? (
              <p>{challenge.player.username}</p>
            ) : (
              <p>{challenge.player}</p>
            )}
          </Link>
          <p>{challenge.transcurredTime}</p>
        </div>
      </UserInfo>
      <ChallengeInfo>
        <p onClick={() => navigate("/visit/" + challenge.id)}>
          {challenge.description}
        </p>
        <p className="player">
          {" "}
          Challenged by
          <Link to={`/profile/${challenge.watcher.username}`}>
            {challenge.watcher.username ? (
              <span>{challenge.watcher.username}</span>
            ) : (
              <span>{challenge.watcher}</span>
            )}
          </Link>
        </p>
      </ChallengeInfo>
      <Suspense fallback={<div>Loading video...</div>}>
        <LazyVideo
          src={challenge.videos.videoUrl}
          ref={(el) => (videoRefs.current[index] = el)}
        />
      </Suspense>
      <Interaction>
        <div>
          <ButtonLike videoId={challenge.videos.id} refetch={refetch} />
          <p>{challenge.videos.meGustas.length}</p>
        </div>
        <button onClick={() => setShowComments(!showComments)}>
          {user.rol === "watcher" ? (
            <img src={WatcherComment} alt="" />
          ) : (
            <img src={PlayerComment} alt="" />
          )}
        </button>
        <ShareButton
          url={url + challenge.videos.id}
          title={challenge.description}
          thumbnail={challenge.videos.videoUrl + "/path/to/thumbnail.jpg"}
          setShowComments={setShowComments}
        />
      </Interaction>
      <NewComment
        comments={challenge.videos.comments}
        setShowComments={setShowComments}
        showComments={showComments}
        videoChallenge={challenge.videos.id}
        refetch={refetch}
      />
    </ChallengeVideo>
  );
};

export default ChallengeWithVideo;
