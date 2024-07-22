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
const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const VisitChallenge = () => {
  const [user] = useUserContext();
  const { id } = useParams();
  const [challenge, setChallenge] = useState();
  const [showComments, setShowComments] = useState(false);
  const newDate = new Date();
  const formattedDate = moment(newDate).format("YYYY-MM-DDTHH:mm:ss");
  const currentDate = moment(formattedDate).toDate();

  // Cuando despleguemos la app, y tengamos URL fija, actualizar y descomentar el código de acá abajo
  const url = "http://localhost:5173/visit/" + id;

  const refetch = () => {
    getChallengeById(id).then((data) => {
      const creationDate = new Date(data.data.videos.creationDate);
      const differenceMs = currentDate - creationDate;
      const differenceSeconds = differenceMs / 1000;
      const differenceMinutes = differenceSeconds / 60;
      const differenceHours = differenceMinutes / 60;
      const difference = () => {
        if (differenceHours > 48) {
          return creationDate;
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
            <ShareButton
              url={url}
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
      )}
      <NavBar />
    </>
  );
};

export default VisitChallenge;
