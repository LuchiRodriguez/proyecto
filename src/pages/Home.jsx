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
      const challengeFilter = data.filter(
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
      setFilteredChallenges([
        ...filteredChallenges,
        filteredChallengesWithTranscurredTime,
      ]);
      console.log(filteredChallenges);
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
