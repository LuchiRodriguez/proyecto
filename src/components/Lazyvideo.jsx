import React from "react";

const LazyVideo = ({ src }) => {
  return (
    <video src={src} autoPlay controls></video>
  );
};

export default LazyVideo;