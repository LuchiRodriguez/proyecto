import {Suspense, useState, lazy, useRef, useEffect} from 'react';
import ButtonLike from './ButtonLike';
import NewComment from './NewComment';
import {UserInfo, ChallengeInfo, ChallengeVideo, Interaction} from '../app/Styles';
import PlayerComment from '../app/img/playerNavBar/playerDiscomment.png';
import WatcherComment from '../app/img/watcherNavBar/watcherDiscommet.png';
import {useUserContext} from '../app/UserProvider';

const LazyVideo = lazy(() => import("../components/Lazyvideo"));

const ChallengeWithVideo = ({challenge, index, refetch, }) => {
    const [user] = useUserContext();
    const [showComments, setShowComments] = useState(false);
    const videoRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.play();
              } else {
                entry.target.pause();
              }
            });
          },
          { threshold: 0.5 } // Adjust as needed
        );
    
        videoRefs.current.forEach((video) => {
          if (video) {
            observer.observe(video);
          }
        });
    
        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          videoRefs.current.forEach((video) => {
            if (video) {
              observer.unobserve(video);
            }
          });
        };
      }, [challenge]);

  return (
    <>
        <ChallengeVideo key={challenge.id}>
          <UserInfo>
            {challenge.player.imagenUrl == null ? (
              <img src={challenge.player.imagenUrl} />
            ) : (
              <img
                src="https://res.cloudinary.com/dappzkn6l/image/upload/v1719672139/21104_jqfpvo.png"
                alt=""
              />
            )}
            <p>{challenge.player.username}</p>
          </UserInfo>
          <ChallengeInfo>
            <p>{challenge.description}</p>
            <p className="player">
              {" "}
              Challenged by <span>{challenge.watcher.username}</span>
            </p>
          </ChallengeInfo>
          <Suspense fallback={<div>Loading video...</div>}>
            <LazyVideo
              src={challenge.videos.videoUrl}
              ref={(el) => (videoRefs.current[index] = el)}
            />
          </Suspense>
          <Interaction>
            <ButtonLike />
            <button onClick={() => setShowComments(!showComments)}>
              {user.rol === "watcher" ? (
                <img src={WatcherComment} alt="" />
              ) : (
                <img src={PlayerComment} alt="" />
              )}
            </button>
          </Interaction>
          <NewComment comments={challenge.videos.comments} setShowComments={setShowComments} showComments={showComments} videoChallenge={challenge.videos.id} refetch={refetch}/>
        </ChallengeVideo>
    </>
  )
}

export default ChallengeWithVideo