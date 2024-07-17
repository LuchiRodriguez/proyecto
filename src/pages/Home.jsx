import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";

import { useUserContext } from "../app/UserProvider";
import ChallengeWithVideo from "../components/ChallengeWithVideo";

const Home = () => {
  const [user] = useUserContext();
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  

  const refetch = () => {
    getChallenges().then((data) => {
      const challengeFilter = data.filter((challenges) => challenges.videos !== null
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
        setFilteredChallenges([
          ...filteredChallenges,
          filteredChallengesWithTranscurredTime,
        ]);
    });
  }

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);


  return (
    <>
<<<<<<< HEAD
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
=======
    {filteredChallenges?.map((challenge, index) => 
      <ChallengeWithVideo key={challenge.id} index={index} challenge={challenge} refetch={refetch}/>
      )}
>>>>>>> master
      <NavBar />
    </>
  )
};

export default Home;
