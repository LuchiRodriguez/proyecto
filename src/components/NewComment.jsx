import { useEffect, useState, useCallback } from "react";
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
    const fetchUsers = async () => {
      const data = await getUserByComments(comments);
      setUsers(data);
<<<<<<< HEAD
    });
    refetch();
  }, []);
  console.log(comments)
  const handleComments = async (e) => {
    e.preventDefault();
=======
    };
    fetchUsers();
  }, [comments]);

  const handleComments = useCallback(
    async (e) => {
      e.preventDefault();
>>>>>>> master

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
    },
    [content, user.username, videoChallenge, refetch]
  );

  const handleContentChange = (e) => setContent(e.target.value);

  const renderComments = () =>
    comments.map((comment, i) => (
      <Comments key={comment.id}>
        <div className="user">
          <img
            src={
              users[i]?.imagenUrl ||
              "https://res.cloudinary.com/dappzkn6l/image/upload/v1721810662/21104_j1nx92.png"
            }
            alt=""
          />
          <p>{comment.user}</p>
        </div>
        <p className="text">{comment.content}</p>
      </Comments>
    ));

  return (
    <PopUpComments $showComments={showComments}>
      {comments.length > 0 ? (
        <>
          <NuevoComment>
            <p>Agregar comentario</p>
            <img
              onClick={handleComments}
              src={user.rol === "watcher" ? watcherCheck : playerCheck}
              alt="Submit Comment"
            />
            <input
              value={content}
              type="text"
              onChange={handleContentChange}
            />
          </NuevoComment>
          {renderComments()}
        </>
      ) : (
        <FirstComment>
          <p>Aún no hay comentarios</p>
          <p>Sé el primero en comentar</p>
          <img
            onClick={handleComments}
            src={user.rol === "watcher" ? watcherCheck : playerCheck}
            alt="Submit Comment"
          />
          <input value={content} type="text" onChange={handleContentChange} />
        </FirstComment>
      )}
    </PopUpComments>
  );
};

export default NewComment;

