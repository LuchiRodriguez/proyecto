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

const NavBar = () => {
  const [user] = useUserContext();

  return (
    <NavBarStyle>
      {user.rol === "watcher" && (
        <ul>
          <Link to="/">
            <img src={homeWatcher} alt="" />
          </Link>
          <Link to="/challenges">
            <img src={challengeWatcher} alt="" />
          </Link>
          <Link to="/ranking">
            <img src={rankingWatcher} alt="" />
          </Link>
          <Link to="/profile">
            <img src={userImgWatcher} alt="" />
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
