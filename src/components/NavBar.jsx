import { Link } from "react-router-dom";
import { NavBarStyle } from "../app/Styles";
import userImg from "../app/img/user.png";
import challenge from "../app/img/challenge.png";
import home from "../app/img/home.png";
import ranking from "../app/img/ranking.png";

const NavBar = () => {
  return (
    <NavBarStyle>
      <ul>
        <Link to="/">
          <img src={home} alt="" />
        </Link>
        <Link to="/challenges">
          <img src={challenge} alt="" />
        </Link>
        <Link to="/ranking">
          <img src={ranking} alt="" />
        </Link>
        <Link to="/profile">
          <img src={userImg} alt="" />
        </Link>
      </ul>
    </NavBarStyle>
  );
};

export default NavBar;
