import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onRecordingComplete }) => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [cameraFacingMode, setCameraFacingMode] = useState('user'); // 'user' para cámara frontal, 'environment' para cámara trasera

  const startRecording = () => {
    const recorder = new MediaRecorder(webcamRef.current.stream);
    setMediaRecorder(recorder);
    recorder.ondataavailable = (event) => {
      setVideoChunks((prev) => [...prev, event.data]);
    };
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
    const blob = new Blob(videoChunks, { type: 'video/mp4' });
    onRecordingComplete(blob);
  };

  const toggleCamera = () => {
    setCameraFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    if (recording) {
      const recorder = new MediaRecorder(webcamRef.current.stream);
      setMediaRecorder(recorder);
      recorder.ondataavailable = (event) => {
        setVideoChunks((prev) => [...prev, event.data]);
      };
      recorder.start();
      setRecording(true);
    }
  }, [webcamRef, recording]);

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
