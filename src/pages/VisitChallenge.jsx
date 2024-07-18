import { useEffect, useState, Suspense, lazy } from "react";
import {
  ChallengeVideo,
  UserInfo,
  ChallengeInfo,
  Interaction,
} from "../app/Styles";
import { getChallengeById } from "../app/api/Challenge";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import PlayerComment from "../app/img/playerNavBar/playerDiscomment.png";
import WatcherComment from "../app/img/watcherNavBar/watcherDiscommet.png";
import shareW from "../app/img/watcherNavBar/shareWatcher.png";
import shareP from "../app/img/playerNavBar/sharePlayer.png";
import { useUserContext } from "../app/UserProvider";
import NewComment from "../components/NewComment";
const LazyVideo = lazy(() => import("../components/Lazyvideo"));
import { CopyToClipboard } from "react-copy-to-clipboard";
const VisitChallenge = () => {
  const [user] = useUserContext();
  const { id } = useParams();
  const [challenge, setChallenge] = useState();
  const [showComments, setShowComments] = useState(false);
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  const refetch = () => {
    getChallengeById(id).then((data) => setChallenge(data));
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {challenge != null && (
        <ChallengeVideo>
          <UserInfo>
            {challenge.player.imagenUrl == null ? (
              <img src={challenge.player.imagenUrl} />
            ) : (
              <img
                src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
                alt=""
              />
            )}
            <div>
              <p>{challenge.player.username}</p>
              <p>{challenge.transcurredTime}</p>
            </div>
          </UserInfo>
          <ChallengeInfo>
            <p>{challenge.description}</p>
            <p className="player">
              {" "}
              Challenged by <span>{challenge.watcher.username}</span>
            </p>
          </ChallengeInfo>
          <Suspense fallback={<div>Loading video...</div>}>
            <LazyVideo src={challenge.videos.videoUrl} />
          </Suspense>
          <Interaction>
            <ButtonLike />
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
      )}
      <NavBar />
    </>
  );
};

export default VisitChallenge;
