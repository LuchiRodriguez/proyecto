import { useEffect, useState, lazy, Suspense } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";
import { UserInfo, ChallengeBox } from '../app/Styles';

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const Home = () => {
  const [videos, setVideos] = useState([]);

  const challenges = videos.filter(video => video.videoUrl !== null);

  useEffect(() => {
    getChallenges().then((data) => {
      setVideos(data.data)
    });
  }, []);

  return (
    <>
      {challenges?.map((challenge) => (
        <ChallengeBox key={challenge.id}>
          <UserInfo>
            {challenge.watcher.imagenUrl ? <img src={challenge.watcher.imagenUrl} /> : <img src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png" alt="" />}
            <p>{challenge.watcher.username}</p>
          </UserInfo>
          <p>{challenge.description}</p>
          <p className="player">Realizado por <span>{challenge.player.username}</span></p>
          <Suspense fallback={<div>Cargando video...</div>}>
            <LazyVideo src={challenge.videoUrl} />
          </Suspense>
        </ChallengeBox>
      ))}
      <NavBar />
    </>
  );
};

export default Home;
