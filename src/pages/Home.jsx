import { useEffect } from "react";
// import ReactPlayer from "react-player";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";

const Home = () => {
  // const [videos, setVideos] = useState([]);

  useEffect(() => {
    getChallenges().then((data) => console.log(data));
  }, []);

  return (
    <>
      <NavBar />
    </>
  );
};

export default Home;
