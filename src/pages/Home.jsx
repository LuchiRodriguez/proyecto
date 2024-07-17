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
      setFilteredChallenges(challengeFilter);
    });
  }

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);






  return (
    <>
      {filteredChallenges?.map((challenge, index) =>
        <ChallengeWithVideo key={challenge.id} index={index} challenge={challenge} refetch={refetch} />
      )}
      <NavBar />
    </>
  )
};

export default Home;
