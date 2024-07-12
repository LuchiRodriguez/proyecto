import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserByUsername } from "../app/api/User";
import { PopUpContainer, VideosContainer } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import close from "../app/img/playerNavBar/close.png";

const PopupProfile = ({ onClose }) => {
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
            {videos.map((video, i) => {
                return (

                    <VideosContainer key={i}>
                        <video src={video.videoUrl} controls />
                    </VideosContainer>
                )
            })}
            <button onClick={close}>{close}</button>
        </PopUpContainer>
    )
}

export default PopupProfile