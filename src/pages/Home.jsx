import { useEffect, useState, lazy, Suspense, useRef } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";
import ButtonLike from "../components/ButtonLike";
import NewComment from "../components/NewComment";
import {
  UserInfo,
  ChallengeInfo,
  ChallengeVideo,
  Interaction,
} from "../app/Styles";
import PlayerComment from "../app/img/playerNavBar/playerDiscomment.png";
import WatcherComment from "../app/img/watcherNavBar/watcherDiscommet.png";
import { useUserContext } from "../app/UserProvider";
import moment from "moment";

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const Home = () => {
  const [user] = useUserContext();
  const [showComments, setShowComments] = useState(false);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const videoRefs = useRef([]);
  const newDate = new Date();
  const formattedDate = moment(newDate).format("YYYY-MM-DDTHH:mm:ss");
  const parsedDate = moment(formattedDate).toDate();

  useEffect(() => {
    if (user) {
      getChallenges().then((data) => {
        const filteredChallenges = data.data.filter(
          (challenges) => challenges.videos !== null
        );
        const filteredChallengesWithTranscurredTime = filteredChallenges.map(
          (video) => {
            const currentDate = new Date(video.videos.creationDate);
            console.log(currentDate);
            console.log(parsedDate);
            const differenceMs = parsedDate - currentDate;
            console.log(differenceMs);
            const differenceSeconds = differenceMs / 1000;
            const differenceMinutes = differenceSeconds / 60;
            const differenceHours = differenceMinutes / 60;
            console.log(`Diferencia en segundos: ${differenceSeconds}`);
            console.log(`Diferencia en minutos: ${differenceMinutes}`);
            console.log(`Diferencia en horas: ${differenceHours}`);
            const transcurredTime = video.videos.creationDate;
            return transcurredTime;
          }
        );
        setFilteredChallenges(filteredChallengesWithTranscurredTime);
        console.log(filteredChallengesWithTranscurredTime);
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
            <p>{challenge.videos.creationDate}</p>
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
