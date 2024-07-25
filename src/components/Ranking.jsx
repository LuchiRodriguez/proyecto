import NavBar from "./NavBar";
import { Li, RankingDiv, CrownStyle, FirstPlace, SecondPlace, ThirdPlace, AnotherPlace } from '../app/Styles';
import { useEffect, useState } from "react";
import { getUserRanking, getUserByComment } from '../app/api/User';
import rankingCrownWatcher from "../app/img/watcherNavBar/rankingcrown.png";
import rankingCrownPlayer from "../app/img/playerNavBar/rankingCrownPlayer.png";

import { useUserContext } from "../app/UserProvider";

const Ranking = () => {
  const [user] = useUserContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const userRanking = await getUserRanking();
        const userComments = await getUserByComment(userRanking);
        setUsers(userComments);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <>
      <RankingDiv>
        <h1>Ranking</h1>
        {user.rol === "watcher" && (
          <CrownStyle src={rankingCrownWatcher} alt="" />)}
        {user.rol === "player" && (
          <CrownStyle src={rankingCrownPlayer} alt="" />)}
        <ul>
          {users.map((usuario, i) => {
            const UserPlace = 
              i === 0 ? FirstPlace : 
              i === 1 ? SecondPlace : 
              i === 2 ? ThirdPlace : AnotherPlace;
              
            return (
              <UserPlace key={usuario.id}>
                <Li>
                  <p>{i + 1}.</p>
                  {usuario.imagenUrl ? (
                    <img src={usuario.imagenUrl} />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
                      alt=""
                    />
                  )}
                  <p className="username">{usuario.username}</p>
                  <p className="points">{usuario.points}</p>
                </Li>
              </UserPlace>
            );
          })}
        </ul>
      </RankingDiv>
      <NavBar />
    </>
  );
};

export default Ranking;

