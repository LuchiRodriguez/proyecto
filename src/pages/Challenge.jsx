import { useState } from 'react';
import {UserInfo, ChallengeBox} from '../app/Styles';
import { useUserContext } from '../app/UserProvider';
import {updateChallenge, postChallengeVideo} from '../app/api/Challenge';

const Challenge = ({ch}) => {
const [user] = useUserContext();
const [file, setFile] = useState(null);


  const handleVideo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("player", user.username);
    formData.append("points", ch.points);

   await postChallengeVideo(ch.id, formData)
  }
  return (
    <>
          <ChallengeBox >
          <UserInfo>
            {ch.watcher.imagenUrl ? <img src={ch.watcher.imagenUrl} /> : <img src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png" alt="" />}
            <p>{ch.watcher.username}</p>
          </UserInfo>
          <p>{ch.description}</p>
          <p>{ch.points}</p>

          {ch.player != null ? <p className='player'>Aceptado por <span>{ch.player.username}</span></p> : <button onClick={() => updateChallenge(ch.id, user.username)}>Aceptar desafio</button>}
          
          {ch.player != null && <div>
          <form onSubmit={handleVideo} encType="multipart/form-data">
          <input type="file" onChange={e => setFile(e.target.files[0])}/>
            <br />
            <button type='submit'>Subir video</button>
          </form>
          </div> }
        </ChallengeBox>
    </>
  )
}
export default Challenge
