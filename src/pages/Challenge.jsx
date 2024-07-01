import { useState } from "react";
import { UserInfo, ChallengeBox } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { updateChallenge, postChallengeVideo } from "../app/api/Challenge";
import { useNavigate } from "react-router-dom";

const Challenge = ({ ch, refetch }) => {
  const [user] = useUserContext();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleVideo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("player", user.username);
    formData.append("points", ch.points);

    await postChallengeVideo(ch.id, formData);
    refetch();
    navigate("/");
  };

  const handleClick = async () => {
    await updateChallenge(ch.id, user.username);
    refetch();
  };
  return (
    <>
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
        <p>{ch.description}</p>
        <p>{ch.points}</p>

        {ch.player != null ? (
          <p className="player">
            Aceptado por <span>{ch.player.username}</span>
          </p>
        ) : (
          <button onClick={handleClick}>
            Aceptar desafio
          </button>
        )}

        {ch.player != null && (
          <div>
            <form onSubmit={handleVideo} encType="multipart/form-data">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <br />
              <button type="submit">Subir video</button>
            </form>
          </div>
        )}
      </ChallengeBox>
    </>
  );
};
export default Challenge;
