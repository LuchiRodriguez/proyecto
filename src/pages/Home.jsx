import { useState } from "react";
import ReactPlayer from 'react-player';


const Home = () => {
  const [videos, setVideos] = useState([]);

  const handleVideoUpload = (e) => {
    const file = e.target.file[0];
    const url = URL.createObjectURL(file);

    setVideos([...videos, { url: url, title: file.name }])
  };

  return (
    <div className="container">
      <input type="file" onChange={handleVideoUpload} />
      {videos.map((video) => (
        <div className="videosItem" key={video.url}>
          <h3>{video.title}</h3>
          <ReactPlayer url={video.url} controls={true} width="500" height="300" />
        </div>
      ))}
    </div>
  )
}

export default Home