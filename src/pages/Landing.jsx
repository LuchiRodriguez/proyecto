import { LandingPage } from "../app/Styles";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <LandingPage>
      <h1>Welcome to final-project</h1>
      <div>
        <Link to="/login">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          PLAYER
        </Link>
        <Link to="/login">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          WATCHER
        </Link>
      </div>
    </LandingPage>
  );
};

export default Landing;
