import { useEffect, useState } from "react";
// import ReactPlayer from "react-player";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getChallenges().then((data) => setVideos(data));
  }, []);

  return (
    <>
      {videos.map((video) => (
        <div key={video.id}>
          <div>
            <img src={video.player.imagenUrl} />
            <p>{video.player.username}</p>
          </div>
          <p>{video.description}</p>
        </div>
      ))}
      <NavBar />
    </>
  );
};

export default Home;
