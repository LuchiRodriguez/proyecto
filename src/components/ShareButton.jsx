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
import { ShareList } from "../app/Styles";

const ShareButton = ({ url, title, thumbnail, share, setShare }) => {
  return (
    <ShareList $share={share} onClick={() => setShare(false)}>
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
  );
};

export default ShareButton;
