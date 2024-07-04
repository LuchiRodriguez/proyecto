import React from 'react';
import usuarios from '../app/api/Users.json';
import NavBar from './NavBar';
import { Li } from '../app/Styles';

const Ranking = () => {
  return (
    <>
      <div>
        <h1>Ranking</h1>
        <ul>
          {usuarios.map((usuario, index) => (
            <Li key={index}>
              <p>{usuario.username}</p>
              <p>Points: {usuario.points}</p>

            </Li>
          ))}
        </ul>
      </div>
      <NavBar />
    </>

  );
};

export default Ranking;
