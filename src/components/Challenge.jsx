import { useEffect, useState, useRef, useCallback } from "react";
import { UserInfo, ChallengeBox, UploadingDiv, ButtonStyle, UploadVideo, ChallengeInfo } from "../app/Styles";
import { Link } from "react-router-dom";
import { useUserContext } from "../app/UserProvider";
import { updateChallenge, postChallengeVideo } from "../app/api/Challenge";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import loadingicono from "../app/img/lodingicon.gif";
import {getUserByUsername} from '../app/api/User';

const Challenge = ({ ch, refetch }) => {
  console.log(ch)
  const [user] = useUserContext();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [acceptChallengeError, setAcceptChallengeError] = useState("");
  const [usuario, setUsuario] = useState({})
  console.log(usuario)
  // const [challengeAccepted, setChallengeAccepted] = useState(
  //   ch.player?.username === user.username
  // );
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();

  const fetchChallenge = useCallback(async () => {
    try {
      if (ch.player != null) {
        const data = await getUserByUsername(ch.player.username || ch.player);
        setUsuario(data);
      }
      // setchAccepted(data.player?.username || data.player === user.username);
    } catch (error) {
      console.error("Error fetching challenge:", error);
    }
  }, [ch]);

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

      const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dht6hwart/video/upload', formData);
      const uploadedVideoUrl = cloudinaryResponse.data.secure_url;

      const backendFormData = new FormData();
      backendFormData.append("player", user.username);
      backendFormData.append("watcher", ch.watcher.username);
      backendFormData.append("file", uploadedVideoUrl);
      backendFormData.append("points", ch.points);
      backendFormData.append("challenge", ch.id);

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
      await updateChallenge(ch.id, user.username);
      fetchChallenge();
    } catch (error) {
      console.error("Error accepting challenge:", error);
      setAcceptChallengeError("Failed to accept challenge. Please try again");
    }
  };

  const handleCancel = async () => {
    try {
      await updateChallenge(ch.id, "");
      fetchChallenge();
    } catch (error) {
      console.error("Error cancelling challenge:", error);
      setAcceptChallengeError("Failed to cancel challenge. Please try again");
    }
  };

  const handleRecording = (blob) => {
    const file = new File([blob], "recorded-video.mp4", { type: "video/mp4" });
    setFile(file);
    setMediaBlobUrl(URL.createObjectURL(blob));
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setMediaStream(stream);
    videoRef.current.srcObject = stream;
    videoRef.current.play();

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      handleRecording(blob);
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setFile(null);
    setMediaBlobUrl(null);
    setRecording(false);
  };

  return (
    <ChallengeBox>
      <UserInfo>
        {ch.watcher.imagenUrl != null ? (
          <img src={ch.watcher.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
            alt=""
          />
        )}
        <Link to={`/profile/${ch.watcher.username}`}>
          <p>{ch.watcher.username}</p>
        </Link>
      </UserInfo>
      <ChallengeInfo>
        <p>Challenges you to: {ch.description}</p>
        <p>Reward: {ch.points}</p>
        {ch.player ? (
          <p className="watcher">
            Accepted by <Link to={`/profile/${ch.watcher.username}`}><span>{ch.player.username || ch.player}</span></Link>
          </p>
        ) : null}
        {usuario?.username === user.username ? (
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
                      <button type="submit">Upload video</button>
                      <button type="button" onClick={cancelRecording}>Cancel Video</button>
                    </>
                  ) : (
                    <>
                      <input
                        id="file-upload"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      {recording || mediaStream ? (
                        <video ref={videoRef} autoPlay />
                      ) : null}
                      {!recording ? (
                        <button type="button" onClick={startRecording}>
                          Start Recording
                        </button>
                      ) : (
                        <button type="button" onClick={stopRecording}>
                          Stop Recording
                        </button>
                      )}
                    </>
                  )}
                </form>
              )}
              {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
            </UploadVideo>
          </>
        ) : (
          user.rol === "player" && ch.player === null && (
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













