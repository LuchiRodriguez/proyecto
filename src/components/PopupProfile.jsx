import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserByUsername } from "../app/api/User";
import { PopUpContainer, VideosBox, BtnPopUp, VideoEdit } from '../app/Styles';
import { useUserContext } from "../app/UserProvider";
import closeBtn from "../app/img/playerNavBar/close.png";

const PopupProfile = ({ onClose, video }) => {
    const { index } = video;
    const [user] = useUserContext({});
    const { id } = useParams();
    const [videos, setVideos] = useState([]);

    const fetchData = () => {
        getUserByUsername(user.username).then((data) => {
            
            setVideos(data.videos);
        });

    }

    useEffect(() => {
        fetchData();
    }, [id, user.username]);

    const close = () => {
        onClose();
    }
    return (
        <PopUpContainer>
            <VideosBox>
                <VideoEdit>
                    <video src={video.videoUrl} controls />
                </VideoEdit>
                <BtnPopUp onClick={close}><img src={closeBtn} alt="Close" /></BtnPopUp>
            </VideosBox>
            {videos.map((video, i) => {
                if (i !== index)
                    return (
                        <VideosBox key={i}>
                            <VideoEdit>
                                <video src={video.videoUrl} controls />
                            </VideoEdit>
                            <BtnPopUp onClick={close}><img src={closeBtn} alt="Close" /></BtnPopUp>
                        </VideosBox>
                    )
            })}
        </PopUpContainer>
    )
}

export default PopupProfile