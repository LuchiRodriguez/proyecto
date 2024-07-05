import NavBar from "./NavBar";
import { Li, RankingDiv, CrownStyle, FirstPlace, SecondPlace, ThirdPlace, AnotherPlace } from '../app/Styles';
import { useEffect, useState } from "react";
import { getUserRanking } from "../app/api/User";
import rankingCrown from "../app/img/rankingcrown.png";

const Ranking = () => {
  const [listRanking, setListRankings] = useState([]);

  useEffect(() => {
    getUserRanking().then((data) => setListRankings(data));
  }, []);

  return (
    <>
      <RankingDiv>
        <h1>Ranking</h1>
        <CrownStyle src={rankingCrown} alt="" />
        <ul>
          {listRanking.map((usuario, i) => {
            if (i === 0) {
              return (
                <FirstPlace key={usuario.id}>
                  <Li>
                    <p>{i + 1}.</p>
                    {usuario.imagenUrl ? (
                      <img src={usuario.imagenUrl} />
                    ) : (
                      <img
                        src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
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
                        src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
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
                        src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
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
                        src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
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
