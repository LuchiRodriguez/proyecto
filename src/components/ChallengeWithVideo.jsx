import {
  Suspense,
  useState,
  lazy,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLike from "./ButtonLike";
import NewComment from "./NewComment";
import ShareButton from "./ShareButton";
import {
  UserInfo,
  ChallengeInfo,
  ChallengeVideo,
  Interaction,
} from "../app/Styles";
import PlayerComment from "../app/img/playerNavBar/playerDiscomment.png";
import WatcherComment from "../app/img/watcherNavBar/watcherDiscommet.png";
import { useUserContext } from "../app/UserProvider";
import { getPlayerByVideo } from "../app/api/User";
import shareW from "../app/img/watcherNavBar/shareWatcher.png";
import shareP from "../app/img/playerNavBar/sharePlayer.png";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const ChallengeWithVideo = ({ challenge, index, refetch }) => {
  const [user] = useUserContext();
  const [showComments, setShowComments] = useState(false);
  const [player, setPlayer] = useState({});
  const [share, setShare] = useState(false);
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const url = "https://www.aimapp.es/visit/";

  useEffect(() => {
    const fetchPlayer = async () => {
      const usuarios = await getPlayerByVideo(challenge);
      setPlayer(usuarios);
    };
    fetchPlayer();

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
      { threshold: 0.5 }
    );

    const videos = videoRefs.current;
    videos.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videos.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [challenge]);

  const handleShareClick = useCallback(() => {
    setShare((prevShare) => !prevShare);
    setShowComments(false);
  }, []);

  const handleCommentClick = useCallback(() => {
    setShowComments((prevShowComments) => !prevShowComments);
  }, []);

  return (
    <ChallengeVideo $share={share}>
      <UserInfo>
        {player.imagenUrl ? (
          <img src={player.imagenUrl} alt="Player Avatar" />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
            alt="Default Avatar"
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
        <p onClick={() => navigate(`/visit/${challenge.id}`)}>
          {challenge.description}
        </p>
        <p className="player">
          Challenged by
          <Link
            to={`/profile/${challenge.watcher.username || challenge.watcher}`}
          >
            <span>{challenge.watcher.username || challenge.watcher}</span>
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
        <button onClick={handleCommentClick}>
          <img
            src={user.rol === "watcher" ? WatcherComment : PlayerComment}
            alt="Comment"
          />
        </button>
        <button onClick={handleShareClick}>
          <img src={user.rol === "watcher" ? shareW : shareP} alt="Share" />
        </button>
      </Interaction>
      {share && (
        <ShareButton
          url={`${url}${challenge.id}`}
          title={challenge.description}
          thumbnail={`${challenge.videos.videoUrl}/path/to/thumbnail.jpg`}
          setShowComments={setShowComments}
          share={share}
          setShare={setShare}
        />
      )}
      {showComments && (
        <NewComment
          comments={challenge.videos.comments}
          setShowComments={setShowComments}
          showComments={showComments}
          videoChallenge={challenge.videos.id}
          refetch={refetch}
        />
      )}
    </ChallengeVideo>
  );
};

export default ChallengeWithVideo;
