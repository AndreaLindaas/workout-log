import video from "/assets/media/man-pushup.mp4";
import "./video.scss";
export default function Video() {
  return <video autoPlay muted loop src={video} />;
}
