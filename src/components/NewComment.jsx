import { useEffect, useState } from "react";
import {
  Comments,
  PopUpComments,
  NuevoComment,
  FirstComment,
} from "../app/Styles";
import watcherCheck from "../app/img/watcherNavBar/watcherCheck.png";
import playerCheck from "../app/img/playerNavBar/playerCheck.png";
import { useUserContext } from "../app/UserProvider";
import { createComment } from "../app/api/Comments";
import { getUserByComments } from "../app/api/User";

const NewComment = ({ comments, showComments, videoChallenge, refetch }) => {
  const [user] = useUserContext();
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserByComments(comments).then((data) => {
      setUsers(data);
    });
    refetch();
  }, []);

  const handleComments = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content", content);
    formData.append("user", user.username);
    formData.append("video", videoChallenge);

    try {
      await createComment(formData);
      refetch();
      setContent("");
    } catch (error) {
      console.error("Error comment:", error);
    }
  };

  return (
    <PopUpComments $showComments={showComments}>
      {comments.length > 0 ? (
        <>
          <NuevoComment>
            <p>Agregar comentario</p>
            <img
              onClick={handleComments}
              src={user.rol === "watcher" ? watcherCheck : playerCheck}
              alt=""
            />
            <input
              value={content}
              type="text"
              onChange={(e) => setContent(e.target.value)}
            />
          </NuevoComment>
          {comments.map((comment, i) => (
            <Comments key={comment.id}>
              <div className="user">
                <img
                  src={
                    users[i]?.imagenUrl
                      ? users[i]?.imagenUrl
                      : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
                  }
                  alt=""
                />
                <p>{comment.user}</p>
              </div>
              <p className="text">{comment.content}</p>
            </Comments>
          ))}
        </>
      ) : (
        <FirstComment>
          <p>Aún no hay comentarios</p>
          <p>Sé el primero en comentar</p>
          <img
            onClick={handleComments}
            src={user.rol === "watcher" ? watcherCheck : playerCheck}
            alt=""
          />
          <input type="text" onChange={(e) => setContent(e.target.value)} />
        </FirstComment>
      )}
    </PopUpComments>
  );
};

export default NewComment;
