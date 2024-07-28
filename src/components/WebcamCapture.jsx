import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onRecordingComplete }) => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [cameraFacingMode, setCameraFacingMode] = useState('user');

  const startRecording = () => {
    setVideoChunks([]);
    const recorder = new MediaRecorder(webcamRef.current.stream);
    setMediaRecorder(recorder);
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        setVideoChunks((prev) => [...prev, event.data]);
      }
    };
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  useEffect(() => {
    if (!recording && videoChunks.length > 0) {
      const blob = new Blob(videoChunks, { type: 'video/mp4' });
      onRecordingComplete(blob);
    }
  }, [recording, videoChunks, onRecordingComplete]);

  const toggleCamera = () => {
    setCameraFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div>
      <Webcam
        audio={true}
        ref={webcamRef}
        videoConstraints={{ facingMode: cameraFacingMode }}
      />
      <div>
        <button type="button" onClick={recording ? stopRecording : startRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button type="button" onClick={toggleCamera}>
          Cambiar a {cameraFacingMode === 'user' ? 'cámara trasera' : 'cámara frontal'}
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
