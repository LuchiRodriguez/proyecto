import { useEffect, useState } from "react";
import {Comments, PopUpComments, NuevoComment} from '../app/Styles';
import watcherCheck from "../app/img/watcherNavBar/watcherCheck.png";
import playerCheck from "../app/img/playerNavBar/playerCheck.png";
import { useUserContext } from "../app/UserProvider";
import userImg from "../app/img/playerNavBar/user.png";
import {createComment} from '../app/api/Comments';

const NewComment = ({comments, showComments, videoChallenge, refetch }) => {
  const [user] = useUserContext();
  const [content, setContent] = useState("");

  useEffect(() => {
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
         <div className="check">
         <p>Agregar comentario</p>
          <img
            onClick={handleComments}
            src={user.rol === "watcher" ? watcherCheck : playerCheck}
            alt=""
          />
         </div>
          <input
          value={content}
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
          </NuevoComment>
          {comments.map((comment) => (
            <Comments key={comment.id}>
             <div className="user">
             <img src={userImg} alt="" />
             <p>{user.username}</p>
             </div>
              <p>{comment.content}</p>
            </Comments>
          ))}
        </>
      ) : (
        <>
          <p>Aún no hay comentarios</p>
          <p>Sé el primero en comentar</p>
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
            <img
            onClick={handleComments}
            src={user.rol === "watcher" ? watcherCheck : playerCheck}
            alt=""
          />
        </>
      )}
    </PopUpComments>
  );
};

export default NewComment;
