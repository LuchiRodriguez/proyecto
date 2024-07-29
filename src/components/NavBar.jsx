import { Link } from "react-router-dom";
import { NavBarStyle } from "../app/Styles";
import userImgWatcher from "../app/img/watcherNavBar/user.png";
import challengeWatcher from "../app/img/watcherNavBar/challenge.png";
import homeWatcher from "../app/img/watcherNavBar/home.png";
import rankingWatcher from "../app/img/watcherNavBar/ranking.png";
import { useUserContext } from "../app/UserProvider";

import homePlayer from "../app/img/playerNavBar/home.png";
import userImgPlayer from "../app/img/playerNavBar/user.png";
import challengePlayer from "../app/img/playerNavBar/challenge.png";
import rankingPlayer from "../app/img/playerNavBar/ranking.png"
import aimLogo from "../app/img/watcherNavBar/logoAim.png";
import { useEffect, useState } from "react";
import { getChallenges } from '../app/api/Challenge';

const NavBar = () => {
  const [user] = useUserContext();
  const [challengeId, setChallengeId] = useState([]);

  useEffect(() => {
    const fetchChallenge = async () => {
      const challenges = await getChallenges();
  

      const ids = challenges
        .filter(challenge => challenge.videos && challenge.videos.videoUrl)
        .map(challenge => challenge.id);
      if (ids.length > 0) {
        const randomIndex = Math.floor(Math.random() * ids.length);
        setChallengeId(ids[randomIndex]);
      }
    }

    fetchChallenge();
  }, []);

  return (
    <NavBarStyle>
      {user.rol === "watcher" && (
        <ul>
          <Link to="/">
            <img src={homeWatcher} alt="home" />
          </Link>
          <Link to="/challenges">
            <img src={challengeWatcher} alt="challenges" />
          </Link>
          {challengeId && (
            <Link to={`/visit/${challengeId}`}>
              <img src={aimLogo} alt="Aim Logo" />
            </Link>
          )}
          <Link to="/ranking">
            <img src={rankingWatcher} alt="ranking" />
          </Link>
          <Link to="/profile">
            <img src={userImgWatcher} alt="profile" />
          </Link>
        </ul>)}
      {user.rol === "player" && (
        <ul>
          <Link to="/">
            <img src={homePlayer} alt="" />
          </Link>
          <Link to="/challenges">
            <img src={challengePlayer} alt="" />
          </Link>
          {challengeId && (
            <Link to={`/visit/${challengeId}`}>
              <img src={aimLogo} alt="Aim Logo" />
            </Link>
          )}
          <Link to="/ranking">
            <img src={rankingPlayer} alt="" />
          </Link>
          <Link to="/profile">
            <img src={userImgPlayer} alt="" />
          </Link>
        </ul>
      )}
    </NavBarStyle>
  );
};

export default NavBar;
