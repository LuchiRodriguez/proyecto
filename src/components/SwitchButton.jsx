import { SwitchButtonContainer } from "../app/Styles";
import player from "../app/img/playerNavBar/player.png";
import watcher from "../app/img/watcherNavBar/watcher.png";
const SwitchButton = () => {
  return (
    <SwitchButtonContainer>
      <input type="checkbox" id="toggle" />
      <label htmlFor="toggle"></label>

      <div className="day-night-cont">
        <span className="the-sun">
          <img src={player} alt="" />
        </span>
        <div className="the-moon">
          <span className="moon-inside">
            <img src={watcher} alt="" />
          </span>
        </div>
      </div>

      <div className="switch">
        <div className="button">{/* <div className="b-inside"></div> */}</div>
      </div>
    </SwitchButtonContainer>
  );
};

export default SwitchButton;
