import PlayerComment from "../app/img/playerNavBar/playerDiscomment.png";
import WatcherComment from "../app/img/watcherNavBar/watcherDiscommet.png";
import { useUserContext } from "../app/UserProvider";

const ButtonComment = () => {
  const [user] = useUserContext();
  return (
    <button>
      {user.rol === "watcher" && <img src={WatcherComment} alt="" />}
      {user.rol === "player" && <img src={PlayerComment} alt="" />}
    </button>
  );
};

export default ButtonComment;
