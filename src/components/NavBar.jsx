import { Link, useNavigate } from "react-router-dom";
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
import { getVideoById } from "../app/api/Video";

const NavBar = () => {
  const [user] = useUserContext();
  const [videoId, setVideoId] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await getVideoById();
      setVideoId(videos.map(video => video.id));
    }

    fetchVideos();
  }, []);

  const handleLogoClick = () => {
    if (videoId.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoId.length);
      const randomVideoId = videoId[randomIndex];
      navigate(`/?videoId=${randomVideoId}`);
    } else {
      navigate(`/`);
    }
  }

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
          <img src={aimLogo} alt="Aim Logo" onClick={handleLogoClick} />
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
          <img src={aimLogo} alt="Aim Logo" onClick={handleLogoClick} />
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
