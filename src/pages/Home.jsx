import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import ChallengeWithVideo from "../components/ChallengeWithVideo";
import moment from "moment";

const Home = () => {
  const [user] = useUserContext();
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const newDate = new Date();
  const formattedDate = moment(newDate).format("YYYY-MM-DDTHH:mm:ss");
  const parsedDate = moment(formattedDate).toDate();

  const refetch = () => {
    getChallenges().then((data) => {
      const challengeFilter = data.filter(
        (challenges) => challenges.videos !== null
      );
      const filteredChallengesWithTranscurredTime = challengeFilter.map(
        (video) => {
          const currentDate = new Date(video.videos.creationDate);
          console.log(currentDate);
          const differenceMs = parsedDate - currentDate;
          const differenceSeconds = differenceMs / 1000;
          const differenceMinutes = differenceSeconds / 60;
          const differenceHours = differenceMinutes / 60;
          const difference = () => {
            if (differenceHours > 48) {
              return currentDate;
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
          return { ...video, transcurredTime };
        }
      );
      setFilteredChallenges(filteredChallengesWithTranscurredTime);
    });
  };

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  return (
    <>
      {filteredChallenges?.map((challenge, index) => (
        <ChallengeWithVideo
          key={challenge.id}
          index={index}
          challenge={challenge}
          refetch={refetch}
        />
      ))}
      <NavBar />
    </>
  );
};

export default Home;