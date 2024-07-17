import { useState } from "react";
import {
  UserInfo,
  ChallengeBox,
  UploadingDiv,
  ButtonStyle,
  ButtonDelete,
  UploadVideo,
  ChallengeInfo,
} from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import {
  updateChallenge,
  postChallengeVideo,
  deleteChallenge,
} from "../app/api/Challenge";
import { useNavigate } from "react-router-dom";
import loadingicono from "../app/img/lodingicon.gif";

const Challenge = ({ ch, refetch }) => {
  const [user] = useUserContext();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [acceptChallengeError, setAcceptChallengeError] = useState("");
  const [challengeAccepted, setChallengeAccepted] = useState(
    ch.player !== null
  );
  const navigate = useNavigate();

  const handleVideo = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("player", user.username);
    formData.append("watcher", ch.watcher.username);
    formData.append("file", file);
    formData.append("points", ch.points);
    formData.append("challenge", ch.id);

    if (file && file.size > 500 * 1024 * 1024) {
      setUploadError(
        "File size exceeds the limit (500 MB). Please upload a smaller file."
      );
      setIsUploading(false);
      console.log("quizas entre por aca");
      return;
    }

    try {
      await postChallengeVideo(formData);
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
      refetch();
      setChallengeAccepted(true);
    } catch (error) {
      console.error("Error accepting challenge:", error);
      setAcceptChallengeError("Failed to accept challenge. Please try again");
    }
  };

  const handleCancel = () => {
    setChallengeAccepted(false);
  };

  const handleDelete = async () => {
    try {
      await deleteChallenge(ch.id);
      refetch();
    } catch (error) {
      console.error("Error deleting challenge:", error);
      setAcceptChallengeError("Failed to delete challenge. Please try again");
    }
  };

  return (
    <ChallengeBox>
      <UserInfo>
        {ch.watcher.imagenUrl != null ? (
          <img src={ch.watcher.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
            alt=""
          />
        )}
        <p>{ch.watcher.username}</p>
        {user.rol === "moderador" && (
          <ButtonDelete onClick={handleDelete}>X</ButtonDelete>
        )}
      </UserInfo>
      <ChallengeInfo>
        <p>Challenges you to: {ch.description}</p>
        <p>Reward: {ch.points}</p>

        {challengeAccepted ? (
          <>
            <p className="watcher">
              Accepted by <span>{user.username}</span>
            </p> <br />
            <ButtonStyle onClick={handleCancel}>Cancelar desafío</ButtonStyle>
          </>
        ) : (
          user.rol === "player" && (
            <>
              <ButtonStyle onClick={handleClick}>Accept challenge</ButtonStyle>
              {acceptChallengeError && (
                <p style={{ color: "red" }}>{acceptChallengeError}</p>
              )}
            </>
          )
        )}

        {challengeAccepted && (
          <UploadVideo>
            {isUploading ? (
              <UploadingDiv>
                <img src={loadingicono} alt="Uploading..." />
                <h3>Uploading file, please wait...</h3>
              </UploadingDiv>
            ) : (
              <form onSubmit={handleVideo} encType="multipart/form-data">
                {file ? (
                  <button>Upload video</button>
                ) : (
                  <input
                    id="file-upload"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                )}
              </form>
            )}
            {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
          </UploadVideo>
        )}
      </ChallengeInfo>
    </ChallengeBox>
  );
};

export default Challenge;
