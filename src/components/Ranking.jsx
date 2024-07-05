import NavBar from "./NavBar";
import { Li, RankingDiv } from "../app/Styles";
import { useEffect, useState } from "react";
import { getUserRanking } from "../app/api/User";

const Ranking = () => {
  const [listRanking, setListRankings] = useState([]);

  useEffect(() => {
    getUserRanking().then((data) => setListRankings(data));
  }, []);

  return (
    <>
      <RankingDiv>
        <h1>Ranking</h1>
        <ul>
          {listRanking.map((usuario, i) => (
            <Li key={usuario.id}>
              
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
          ))}
        </ul>
      </RankingDiv>
      <NavBar />
    </>
  );
};

export default Ranking;
