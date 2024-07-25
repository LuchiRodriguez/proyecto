import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../app/api/User";
import { PopUpContainer, VideosBox, BtnPopUp, VideoEdit } from '../app/Styles';
import { useUserContext } from "../app/UserProvider";
import closeBtn from "../app/img/playerNavBar/close.png";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PopUpContainer>
      <VideosBox>
        <VideoEdit>
          <video src={video.videoUrl} controls />
        </VideoEdit>
        <BtnPopUp onClick={close}><img src={closeBtn} alt="Close" /></BtnPopUp>
      </VideosBox>
      {videos.map((video, i) => (
        i !== index && (
          <VideosBox key={video.id}>
            <VideoEdit>
              <video src={video.videoUrl} controls />
            </VideoEdit>
            <BtnPopUp onClick={close}><img src={closeBtn} alt="Close" /></BtnPopUp>
          </VideosBox>
        )
      ))}
    </PopUpContainer>
  );
};

export default PopupProfile;
