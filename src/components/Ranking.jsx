import NavBar from './NavBar';
import {Li, RankingDiv} from '../app/Styles';
import { useEffect, useState } from 'react';
import {getUserRanking} from '../app/api/User';

const Ranking = () => {
  const [listRanking, setListRankings] = useState([])

useEffect(() => {
  getUserRanking().then(data => setListRankings(data))
}, [])

console.log(listRanking)

  return (
    <>
      <RankingDiv>
        <h1>Ranking</h1>
        <ul>
          {listRanking.map((usuario) => (
            <Li key={usuario.id}>
              <div className='ranking'>
              <p>{usuario.username}</p>
              <p>{usuario.points}</p>
              </div>
            </Li>
          ))}
        </ul>
      </RankingDiv>
      <NavBar />
    </>

  );
};

export default Ranking;
