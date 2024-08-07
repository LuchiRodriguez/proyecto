import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const LazyVideo = forwardRef(({ src }, ref) => {
  return <video ref={ref} src={src} controls autoPlay muted width="100%" />;
});

export default LazyVideo;
