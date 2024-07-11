import { useEffect, useState } from "react";
import { UserInfo, ChallengeBox, UploadingDiv, ButtonStyle, ButtonDelete, UploadVideo, ChallengeInfo } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { updateChallenge, postChallengeVideo, deleteChallenge, getChallengeById } from "../app/api/Challenge";
import { useNavigate } from "react-router-dom";
import loadingicono from "../app/img/lodingicon.gif";

const Challenge = ({ ch, refetch }) => {
  const [user] = useUserContext();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [acceptChallengeError, setAcceptChallengeError] = useState("");
  const [challenge, setChallenge] = useState(ch);
  const [challengeAccepted, setChallengeAccepted] = useState(
    ch.player?.username === user.username
  );
  const [acceptedBy, setAcceptedBy] = useState("");
  const navigate = useNavigate();


  const fetchChallenge = async () => {
    try {
      const { data } = await getChallengeById(ch.id);
      setChallenge(data);
      setChallengeAccepted(data.player?.username === user.username);
      if (data.player) {
        setAcceptedBy(data.player.username);
      } else {
        setAcceptedBy("");
      }
    } catch (error) {
      console.error("Error fetching challenge:", error);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  const handleVideo = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("player", user.username);
    formData.append("watcher", challenge.watcher.username);
    formData.append("file", file);
    formData.append("points", challenge.points);
    formData.append("challenge", challenge.id);

    if (file && file.size > 500 * 1024 * 1024) {
      setUploadError(
        "File size exceeds the limit (500 MB). Please upload a smaller file."
      );
      setIsUploading(false);
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
      fetchChallenge();
    } catch (error) {
      console.error("Error accepting challenge:", error);
      setAcceptChallengeError("Failed to accept challenge. Please try again");
    }
  };

  const handleCancel = async () => {
    try {
      await updateChallenge(ch.id, ""); // Pasar una cadena vacía para cancelar el desafío
      fetchChallenge();
    } catch (error) {
      console.error("Error cancelling challenge:", error);
      setAcceptChallengeError("Failed to cancel challenge. Please try again");
    }
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
        {challenge.watcher.imagenUrl != null ? (
          <img src={challenge.watcher.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
            alt=""
          />
        )}
        <p>{challenge.watcher.username}</p>
        {user.rol === "moderador" && (
          <ButtonDelete onClick={handleDelete}>X</ButtonDelete>
        )}
      </UserInfo>
      <ChallengeInfo>
        <p>Challenges you to: {challenge.description}</p>
        <p>Reward: {challenge.points}</p>

        {challengeAccepted ? (
          <>
            <p className="watcher">
              Accepted by <span>{acceptedBy}</span>
            </p>
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
          </>
        ) : (
          <p className="watcher">
            Accepted by <span>{acceptedBy}</span>
          </p>
        )}

        {!challengeAccepted && (
          user.rol === "player" && challenge.player === null && (
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




