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
import { getPlayerByVideo } from "../app/api/User";
import shareW from "../app/img/watcherNavBar/shareWatcher.png";
import shareP from "../app/img/playerNavBar/sharePlayer.png";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const ChallengeWithVideo = ({ challenge, index, refetch }) => {
  const [user] = useUserContext();
  const [showComments, setShowComments] = useState(false);
  const [player, setPlayer] = useState({});
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const [share, setShare] = useState(false);
  const url = "https://www.aimapp.es/visit/";

  useEffect(() => {
    getPlayerByVideo(challenge).then((usuarios) => {
      setPlayer(usuarios);
    });
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
    <ChallengeVideo $share={share}>
      <UserInfo>
        {player.imagenUrl !== null ? (
          <img src={player.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
            alt=""
          />
        )}
        <div className="time">
          <Link to={`/profile/${player.username}`}>
            <p>{player.username}</p>
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
          <Link
            to={`/profile/${
              challenge.watcher.username
                ? challenge.watcher.username
                : challenge.watcher
            }`}
          >
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
        <button
          onClick={() => {
            setShare(!share), setShowComments(false);
          }}
        >
          {user.rol === "watcher" ? (
            <img src={shareW} alt="" />
          ) : (
            <img src={shareP} alt="" />
          )}
        </button>
      </Interaction>
      <ShareButton
        url={url + challenge.id}
        title={challenge.description}
        thumbnail={challenge.videos.videoUrl + "/path/to/thumbnail.jpg"}
        setShowComments={setShowComments}
        share={share}
        setShare={setShare}
      />
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
