import shareW from "../app/img/watcherNavBar/shareWatcher.png";
import shareP from "../app/img/playerNavBar/sharePlayer.png";
import { useUserContext } from "../app/UserProvider";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useState } from "react";
import { ShareList } from "../app/Styles";

const ShareButton = ({ url, title, thumbnail }) => {
  const [user] = useUserContext();
  const [share, setShare] = useState(false);
  return (
    <>
      <button onClick={() => setShare(!share)}>
        {user.rol === "watcher" ? (
          <img src={shareW} alt="" />
        ) : (
          <img src={shareP} alt="" />
        )}
      </button>
      <ShareList $share={share}>
        <ul>
          <FacebookShareButton
            url={url}
            title={title}
            hashtag="#AIM #challenge"
            thumbnail={thumbnail}
          >
            <FacebookIcon size={32} round />
            <p>Compartir en Facebook</p>
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            title={title}
            hashtag="#AIM #challenge"
            thumbnail={thumbnail}
          >
            <TwitterIcon size={32} round />
            <p>Compartir en Twitter</p>
          </TwitterShareButton>
          <LinkedinShareButton
            url={url}
            title={title}
            hashtag="#AIM #challenge"
            thumbnail={thumbnail}
          >
            <LinkedinIcon size={32} round />
            <p>Compartir en LinkedIn</p>
          </LinkedinShareButton>
          <WhatsappShareButton
            url={url}
            title={title}
            hashtag="#AIM #challenge"
            thumbnail={thumbnail}
          >
            <WhatsappIcon size={32} round />
            <p>Compartir en WhatsApp</p>
          </WhatsappShareButton>
        </ul>
      </ShareList>
    </>
  );
};

export default ShareButton;
