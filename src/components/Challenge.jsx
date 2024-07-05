import { useState } from "react";
import { UserInfo, ChallengeBox, UploadingDiv, ButtonStyle, InputStyle } from '../app/Styles';
import { useUserContext } from "../app/UserProvider";
import { updateChallenge, postChallengeVideo } from "../app/api/Challenge";
import { useNavigate } from "react-router-dom";

const Challenge = ({ ch, refetch }) => {
  const [user] = useUserContext();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [acceptChallengeError, setAcceptChallengeError] = useState("");

  const navigate = useNavigate();

  const handleVideo = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError(""); //Clear any previous upload errors

    const formData = new FormData();
    formData.append("file", file);
    formData.append("watcher", ch.watcher.username);
    formData.append("player", user.username);
    formData.append("points", ch.points);

    if (file && file.size > 500 * 1024 * 1024) {
      setUploadError("File size exceeds the limit (500 MB). Please upload a smaller file.");
      setIsUploading(false);
      return;
    }

    try {
      await postChallengeVideo(ch.id, formData);
      refetch();
      setIsUploading(false);
      navigate("/");
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadError("Failed to upload video. Please try again.")
      setIsUploading(false);
    }
  };

  const handleClick = async () => {
    try {
      await updateChallenge(ch.id, user.username);
      refetch();
    } catch (error) {
      console.error("Error accepting challenge:", error);
      setAcceptChallengeError("Failed to accept challenge. Please try again");
    }
  };

  return (
    <ChallengeBox>
      <UserInfo>
        {ch.watcher.imagenUrl ? (
          <img src={ch.watcher.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
            alt=""
          />
        )}
        <p>{ch.watcher.username}</p>
      </UserInfo>
      <p>Challenges you to: {ch.description}</p>
      <p>Reward:{ch.points}</p>

      {ch.player != null ? (
        <p className="watcher">
          Accepted by <span>{ch.player.username}</span>
        </p>
      ) : (
        user.rol == "player" && (
          <>
            <ButtonStyle onClick={handleClick}>Accept challenge</ButtonStyle>
            {acceptChallengeError && <p style={{ color: 'red' }}>{acceptChallengeError}</p>}
          </>
        )
      )}

      {ch.player != null && (
        <div>
          <form onSubmit={handleVideo} encType="multipart/form-data">
            <InputStyle type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <br />
            <ButtonStyle disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload video"}
            </ButtonStyle>
          </form>
          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
          {isUploading && (
            <UploadingDiv>
              <img
                src="https://i.gifer.com/ZKZg.gif"
                alt="Uploading..."
              />
              <h3>Uploading file, please wait...</h3>
            </UploadingDiv>
          )}
        </div>
      )}
    </ChallengeBox>
  );
};

export default Challenge;
