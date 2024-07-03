import { useState } from "react";
import { UserInfo, ChallengeBox, UploadingDiv } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { updateChallenge, postChallengeVideo } from "../app/api/Challenge";
import { useNavigate } from "react-router-dom";

const Challenge = ({ ch, refetch }) => {
  const [user] = useUserContext();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleVideo = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("player", user.username);
    formData.append("points", ch.points);

    try {
      await postChallengeVideo(ch.id, formData);
      refetch();
      setIsUploading(true);
      navigate("/");
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = async () => {
    await updateChallenge(ch.id, user.username);
    refetch();
  };

  return (
    <ChallengeBox>
      <UserInfo>
        {ch.player.imagenUrl ? (
          <img src={ch.player.imagenUrl} />
        ) : (
          <img
            src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
            alt=""
          />
        )}
        <p>{ch.player.username}</p>
      </UserInfo>
      <p>Challenges you to: {ch.description}</p>
      <p>Reward: {ch.points}</p>

      {ch.player != null ? (
        <p className="watcher">
          Accepted by <span>{ch.watcher.username}</span>
        </p>
      ) : (
        user.rol == "player" && (
          <button onClick={handleClick}>Accept challenge</button>
        )
      )}

      {ch.player != null && (
        <div>
          <form onSubmit={handleVideo} encType="multipart/form-data">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <button disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload video"}
            </button>
          </form>
          {isUploading && (
            <UploadingDiv>
              <img src="https://i.gifer.com/ZKZg.gif" alt="Cargando..." />
              <h3>Uploading file, please wait...</h3>
            </UploadingDiv>
          )}
        </div>
      )}
    </ChallengeBox>
  );
};

export default Challenge;
