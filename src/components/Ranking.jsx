import NavBar from "./NavBar";
import { Li, RankingDiv, CrownStyle, FirstPlace, SecondPlace, ThirdPlace, AnotherPlace } from '../app/Styles';
import { useEffect, useState } from "react";
import {getUserRanking, getUserByComment} from '../app/api/User';
import rankingCrownWatcher from "../app/img/watcherNavBar/rankingcrown.png";
import rankingCrownPlayer from "../app/img/playerNavBar/rankingCrownPlayer.png"

import { useUserContext } from "../app/UserProvider";

const Ranking = () => {
  const [user] = useUserContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserRanking().then((data) => {
      getUserByComment(data).then(dataUser => {
        setUsers(dataUser)
      })
    });
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
            if (i === 0) {
              return (
                <FirstPlace key={usuario.id}>
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
                </FirstPlace>
              );
            } else if (i === 1) {
              return (
                <SecondPlace key={usuario.id}>
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
                </SecondPlace>

              )
            } else if (i === 2) {
              return (
                <ThirdPlace key={usuario.id}>
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
                </ThirdPlace>
              )
            } else {
              return (
                <AnotherPlace key={usuario.id}>
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
                </AnotherPlace>
              )
            }
          })}
        </ul>
      </RankingDiv>
      <NavBar />
    </>
  );
};

export default Ranking;
