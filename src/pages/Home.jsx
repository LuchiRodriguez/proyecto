import { useEffect, useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import { getChallenges } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import ChallengeWithVideo from "../components/ChallengeWithVideo";
import moment from "moment";

const Home = () => {
  const [user] = useUserContext();
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = moment();

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getChallenges();
      const challengeFilter = data.filter(
        (challenges) => challenges.videos !== null
      );
      const filteredChallengesWithTranscurredTime = challengeFilter.map(
        (video) => {
          const creationDate = moment(video.videos.creationDate);
          const difference = moment.duration(currentDate.diff(creationDate));

          const transcurredTime = difference.asHours() > 36 
            ? creationDate.format("ddd D")
            : difference.asHours() >= 24 
            ? "Yesterday"
            : difference.asHours() >= 1 
            ? `${Math.floor(difference.asHours())}h ago`
            : difference.asMinutes() >= 1 
            ? `${Math.floor(difference.asMinutes())}m ago`
            : "NOW";

          return { ...video, transcurredTime };
        }
      );
      setFilteredChallenges(filteredChallengesWithTranscurredTime);
    } catch (err) {
      setError("Failed to fetch challenges");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

