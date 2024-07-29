import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../app/api/User";
import {PopUpContainer, ChallengeVideo, BtnPopUp, VideoEdit, Interaction, VideoProfile} from '../app/Styles';
import { useUserContext } from "../app/UserProvider";
import closeBtn from "../app/img/playerNavBar/close.png";
import PlayerComment from '../app/img/playerNavBar/playerDiscomment.png';
import WatcherComment from '../app/img/watcherNavBar/watcherDiscommet.png';
import ButtonLike from './ButtonLike';

const PopupProfile = ({ onClose, video }) => {
  const { index } = video;
  const [user] = useUserContext();
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = useCallback(async () => {
    try {
      const data = await getUserByUsername(user.username);
      setVideos(data.videos);
    } catch (err) {
      setError("Failed to fetch videos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user.username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const close = () => {
    onClose();
  };
  if (error) return <div>{error}</div>;

  return (
    <PopUpContainer>
      <VideoProfile>
        <VideoEdit>
          <video src={video.videoUrl} controls />
          <Interaction>
        <div>
          <ButtonLike videoId={video.id} refetch={fetchData}/>
          <p>{video.meGustas.length}</p>
        </div>
          <button>
          <img
            src={user.rol === "watcher" ? WatcherComment : PlayerComment}
            alt="Comment"
          />
        </button>
        </Interaction>
        </VideoEdit>
        <BtnPopUp onClick={close}><img src={closeBtn} alt="Close" /></BtnPopUp>
      </VideoProfile>
      {videos.map((vid, i) => (
        i !== index && (
          <VideoProfile key={vid.id}>
            <VideoEdit>
              <video src={vid.videoUrl} controls />
              <Interaction>
            <div>
          <ButtonLike videoId={video.id}  refetch={fetchData}/>
          <p>{video.meGustas.length}</p>
        </div>
              <button>
          <img
            src={user.rol === "watcher" ? WatcherComment : PlayerComment}
            alt="Comment"
          />
        </button>
            </Interaction>
            </VideoEdit>
            <BtnPopUp onClick={close}><img src={closeBtn} alt="Close" /></BtnPopUp>
          </VideoProfile>
        )
      ))}
    </PopUpContainer>
  );
};

export default PopupProfile;
