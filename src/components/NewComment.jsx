import { useEffect, useState } from "react";
import { Comments, PopUpComments, NuevoComment } from '../app/Styles';
import watcherCheck from "../app/img/watcherNavBar/watcherCheck.png";
import playerCheck from "../app/img/playerNavBar/playerCheck.png";
import { useUserContext } from "../app/UserProvider";
<<<<<<< HEAD
import { createComment } from "../app/api/Comments";
import { getUserByUsername } from '../app/api/User';
=======
import { createComment } from '../app/api/Comments';
import {getUserByComments} from '../app/api/User';
>>>>>>> master

const NewComment = ({ comments, showComments, videoChallenge, refetch }) => {
  const [user] = useUserContext();
  const [content, setContent] = useState("");
<<<<<<< HEAD
  const [profileImg, setProfileImg] = useState("")

=======
  const [users, setUsers] = useState([]);
  
>>>>>>> master
  useEffect(() => {
    getUserByComments(comments).then((data) => {
      setUsers(data)
    })
    refetch();
    getUserByUsername().then((data) => {
      setProfileImg(data.imagenUrl);

    })

  }, []);
  console.log(comments)
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
          {comments.map((comment, i) => (
            <Comments key={comment.id}>
              <div className="user">
<<<<<<< HEAD
                {profileImg != null ? (
                  <img src={profileImg} />
                ) : (
                  <img
                    src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
                    alt=""
                  />
                )}
                <p>{comment.user}</p>
              </div>
              <p>{comment.content}</p>
=======
                <img src={users[i]?.imagenUrl ? users[i]?.imagenUrl : "https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"} alt="" />
                <p>{comment.user}</p>
              </div>
              <p className="text">{comment.content}</p>
>>>>>>> master
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
