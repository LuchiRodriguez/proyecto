import { useEffect, useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import { ButtonChallenge, ChallengesList, WithoutChallenges } from "../app/Styles";
import { getChallenges } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import Challenge from "../components/Challenge";
import iconPlus from "../app/img/watcherNavBar/createImg.png";
import CreateChallenge from "../components/CreateChallenge";

const Challenges = () => {
  const [user] = useUserContext();
  const [challenges, setChallenges] = useState([]);
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getChallenges();
      setChallenges(data);
    } catch (err) {
      setError("Failed to fetch challenges");
      console.error(err);
    } finally {
      setLoading(false);
      error
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const challenge = challenges.filter((video) => video.videos == null);

  return (
    <>
      <ChallengesList>
        {!loading ? challenge.length > 0 ? (
          challenge.map((ch) => (
            <Challenge key={ch.id} ch={ch} refetch={refetch} />
          ))
        ) : (
          <WithoutChallenges>No challenges available</WithoutChallenges>
        ) : <div>Loading...</div>}
      </ChallengesList>
      {user.rol === "watcher" && (
        <ButtonChallenge onClick={() => setCreate(!create)}>
          <img src={iconPlus} alt="" />
        </ButtonChallenge>
      )}
      <CreateChallenge create={create} setCreate={setCreate} refetch={refetch} />
      <NavBar />
    </>
  );
};

export default Challenges;

