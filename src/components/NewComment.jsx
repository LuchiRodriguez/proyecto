import { useEffect, useState } from "react";
import { PopUpComments } from "../app/Styles";
import watcherCheck from "../app/img/watcherNavBar/watcherCheck.png";
import playerCheck from "../app/img/playerNavBar/playerCheck.png";
import { useUserContext } from "../app/UserProvider";
import userImg from "../app/img/playerNavBar/user.png";
const NewComment = ({ showComments, challenge }) => {
  const [user] = useUserContext();
  const [comments, setComments] = useState([]);
  const [newComment, setNewCommet] = useState();
  useEffect(() => {
    setComments(challenge.videos.comments);
  }, [comments]);
  // const handleComments = async () => {
  //   setComments(newComment);
  //   // try {
  //   //   await postComments();
  //   // } catch (error) {
  //   //   console.error("Error comment:", error);
  //   // }
  // };
  return (
    <PopUpComments $showComments={showComments}>
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <div key={comment.newComment}>
              <img src={userImg} alt="" />
              <p>Username</p>
              <p>{comment.newComment}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>Aún no hay comentarios</p>
          <p>Sé el primero en comentar</p>
          <img
            onClick={() => {
              comments.push({ newComment }),
                //  navigate("/"),
                console.log(comments);
            }}
            src={user.rol === "watcher" ? watcherCheck : playerCheck}
            alt=""
          />
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setNewCommet(e.target.value)}
          />
        </>
      )}
    </PopUpComments>
  );
};

export default NewComment;
