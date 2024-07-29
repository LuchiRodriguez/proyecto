import { useEffect, useState, Suspense, lazy } from "react";
import {
  ChallengeVideo,
  UserInfo,
  ChallengeInfo,
  Interaction,
} from "../app/Styles";
import { getChallengeById } from "../app/api/Challenge";
import NavBar from "../components/NavBar";
import { useParams, Link } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import PlayerComment from "../app/img/playerNavBar/playerDiscomment.png";
import WatcherComment from "../app/img/watcherNavBar/watcherDiscommet.png";
import { useUserContext } from "../app/UserProvider";
import NewComment from "../components/NewComment";
import ShareButton from "../components/ShareButton";
import moment from "moment";
import shareW from "../app/img/watcherNavBar/shareWatcher.png";
import shareP from "../app/img/playerNavBar/sharePlayer.png";
const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const VisitChallenge = () => {
  const [user] = useUserContext();
  const { id } = useParams();
  const [challenge, setChallenge] = useState();
  const [showComments, setShowComments] = useState(false);
  const newDate = new Date();
  const formattedDate = moment(newDate).format("YYYY-MM-DDTHH:mm:ss");
  const currentDate = moment(formattedDate).toDate();
  const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const url = "https://www.aimapp.es/visit/" + id;
  const [share, setShare] = useState(false);

  const refetch = () => {
    getChallengeById(id).then((data) => {
      const creationDate = new Date(data.data.videos.creationDate);
      const differenceMs = currentDate - creationDate;
      const differenceSeconds = differenceMs / 1000;
      const differenceMinutes = differenceSeconds / 60;
      const differenceHours = differenceMinutes / 60;
      const difference = () => {
        if (differenceHours > 36) {
          return week[creationDate.getDay()] + " " + creationDate.getDay();
        } else if (36 > differenceHours >= 24) {
          return "Yesterday";
        } else if (differenceHours >= 1) {
          return Math.round(differenceHours) + "h ago";
        } else if (60 > differenceMinutes >= 1) {
          return Math.round(differenceMinutes) + "m ago";
        } else {
          return "NOW";
        }
      };
      const transcurredTime = difference();
      setChallenge({ ...data.data, transcurredTime });
    });
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
                src="https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
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
            <p>{challenge.description}</p>
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
            <LazyVideo src={challenge.videos.videoUrl} />
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
            <ShareButton
              url={url}
              title={challenge.description}
              thumbnail={challenge.videos.videoUrl + "/path/to/thumbnail.jpg"}
              setShowComments={setShowComments}
              share={share}
              setShare={setShare}
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
      )}
      <NavBar />
    </>
  );
};

export default VisitChallenge;
