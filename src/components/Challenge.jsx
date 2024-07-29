import { useEffect, useState, useCallback } from "react";
import {
  UserInfo,
  ChallengeBox,
  UploadingDiv,
  ButtonStyle,
  UploadVideo,
  ChallengeInfo,
} from "../app/Styles";
import { Link } from "react-router-dom";
import { useUserContext } from "../app/UserProvider";
import { updateChallenge, postChallengeVideo } from "../app/api/Challenge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingicono from "../app/img/lodingicon.gif";
import { getUserByUsername } from "../app/api/User";
import WebcamCapture from "./WebcamCapture";

const Challenge = ({ ch, refetch }) => {
  const [user] = useUserContext();
  const [challenge, setChallenge] = useState(ch);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [acceptChallengeError, setAcceptChallengeError] = useState("");
  const [usuario, setUsuario] = useState({});
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [watcher, setWatcher] = useState({});
  const navigate = useNavigate();

  const fetchChallenge = useCallback(async () => {
    try {
      const resData = await getUserByUsername(
        challenge.watcher.username || challenge.watcher
      );
      setWatcher(resData);
      if (challenge.player != null) {
        const data = await getUserByUsername(
          challenge.player.username || challenge.player
        );
        setUsuario(data);
      }
    } catch (error) {
      console.error("Error fetching challenge:", error);
    }
  }, [challenge]);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const handleVideo = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError("");

    if (file && file.size > 500 * 1024 * 1024) {
      setUploadError(
        "File size exceeds the limit (500 MB). Please upload a smaller file."
      );
      setIsUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "proyectaim");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dht6hwart/video/upload",
        formData
      );
      const uploadedVideoUrl = cloudinaryResponse.data.secure_url;

      const backendFormData = new FormData();
      backendFormData.append("player", user.username);
      backendFormData.append("watcher", watcher.username);
      backendFormData.append("file", uploadedVideoUrl);
      backendFormData.append("points", challenge.points);
      backendFormData.append("challenge", challenge.id);

      await postChallengeVideo(backendFormData);
      refetch();
      setIsUploading(false);
      navigate("/");
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadError("Failed to upload video. Please try again.");
      setIsUploading(false);
    }
  };

  const handleClick = async () => {
    try {
      await updateChallenge(challenge.id, user.username);
      setChallenge({ ...challenge, player: user.username });
    } catch (error) {
      console.error("Error accepting challenge:", error);
      setAcceptChallengeError("Failed to accept challenge. Please try again");
    }
  };

  const handleCancel = async () => {
    try {
      await updateChallenge(challenge.id, "");
      setChallenge({ ...challenge, player: null });
      setFile(null);
      setMediaBlobUrl(null);
    } catch (error) {
      console.error("Error cancelling challenge:", error);
      setAcceptChallengeError("Failed to cancel challenge. Please try again");
    }
  };

  const handleRecordingComplete = (blob) => {
    const file = new File([blob], "recorded-video.mp4", { type: "video/mp4" });
    setFile(file);
    setMediaBlobUrl(URL.createObjectURL(blob));
  };

  const selectUploadOption = (option) => {
    setUseCamera(option === "camera");
  };

  return (
    <ChallengeBox>
      <UserInfo>
        {watcher.imagenUrl != null ? (
          <img src={watcher.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
            alt=""
          />
        )}
        <Link to={`/profile/${watcher.username}`}>
          <p>{watcher.username}</p>
        </Link>
      </UserInfo>
      <ChallengeInfo>
        <p>Challenges you to: {challenge.description}</p>
        <p>Reward: {challenge.points}</p>
        {challenge.player ? (
          <p className="watcher">
            Accepted by{" "}
            <Link
              to={`/profile/${
                challenge.player.username
                  ? challenge.player.username
                  : challenge.player
              }`}
            >
              <span>{challenge.player.username || challenge.player}</span>
            </Link>
          </p>
        ) : null}
        {usuario?.username === user.username && challenge.player ? (
          <>
            <ButtonStyle onClick={handleCancel}>Cancelar desafío</ButtonStyle>
            <UploadVideo>
              {isUploading ? (
                <UploadingDiv>
                  <img src={loadingicono} alt="Uploading..." />
                  <h3>Uploading file, please wait...</h3>
                </UploadingDiv>
              ) : (
                <form onSubmit={handleVideo} encType="multipart/form-data">
                  {file ? (
                    <>
                      <video src={mediaBlobUrl} controls />
                      <button className="camera" type="submit">
                        Upload video
                      </button>
                      <button type="button" onClick={() => setFile(null)}>
                        Cancel Video
                      </button>
                    </>
                  ) : (
                    <>
                      {!useCamera ? (
                        <>
                          <button
                            className="camera"
                            type="button"
                            onClick={() => selectUploadOption("camera")}
                          >
                            Use Camera
                          </button>
                          <input
                            id="file-upload"
                            type="file"
                            accept="video/*"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </>
                      ) : (
                        <WebcamCapture
                          onRecordingComplete={handleRecordingComplete}
                        />
                      )}
                    </>
                  )}
                </form>
              )}
              {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
            </UploadVideo>
          </>
        ) : (
          user.rol === "player" &&
          challenge.player === null && (
            <>
              <ButtonStyle onClick={handleClick}>Accept challenge</ButtonStyle>
              {acceptChallengeError && (
                <p style={{ color: "red" }}>{acceptChallengeError}</p>
              )}
            </>
          )
        )}
      </ChallengeInfo>
    </ChallengeBox>
  );
};

export default Challenge;
