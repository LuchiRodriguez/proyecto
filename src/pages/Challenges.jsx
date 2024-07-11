import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { ButtonChallenge, ChallengesList } from "../app/Styles";
import { getChallenges } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import Challenge from "../components/Challenge";
import iconPlus from "../app/img/watcherNavBar/createImg.png";
import CreateChallenge from "../components/CreateChallenge";

const Challenges = () => {
  const [user] = useUserContext();
  const [challenges, setChallenges] = useState([]);
  const [create, setCreate] = useState(false);

  const refetch = () => {
    getChallenges().then((data) => {
      setChallenges(data.data);
    });
  };

  const challenge = challenges.filter((video) => video.videos == null);

//Fetch challenges when component mounts or refetch is called.
  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <ChallengesList>
        {challenge.map((ch) => (
          <Challenge key={ch.id} ch={ch} refetch={refetch} />
        ))}
      </ChallengesList>
      {user.rol === "watcher" && (
        <ButtonChallenge onClick={() => setCreate(!create)}>
          <img src={iconPlus} alt="" />
        </ButtonChallenge>
      )}
      <CreateChallenge
        create={create}
        setCreate={setCreate}
        refetch={refetch}
      />
      <NavBar />
    </>
  );
};

export default Challenges;
