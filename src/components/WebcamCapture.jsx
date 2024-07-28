import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onRecordingComplete }) => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [cameraFacingMode, setCameraFacingMode] = useState('user');
  const [segments, setSegments] = useState([]);

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

  const handleToggleCamera = async () => {
    if (recording) {
      mediaRecorder.stop();
      const recorder = await restartWebcam();
      setMediaRecorder(recorder);
      recorder.start();
    } else {
      setCameraFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
    }
  };

  const restartWebcam = async () => {
    const newFacingMode = cameraFacingMode === 'user' ? 'environment' : 'user';
    setCameraFacingMode(newFacingMode);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: newFacingMode },
      audio: true,
    });
    webcamRef.current.srcObject = stream;

    const newRecorder = new MediaRecorder(stream);
    newRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        setSegments((prevSegments) => [
          ...prevSegments,
          ...videoChunks,
          event.data,
        ]);
        setVideoChunks([]);
      }
    };
    return newRecorder;
  };

  useEffect(() => {
    if (!recording && segments.length > 0) {
      const blob = new Blob([...segments, ...videoChunks], { type: 'video/mp4' });
      onRecordingComplete(blob);
      setSegments([]);
    }
  }, [recording, segments, videoChunks, onRecordingComplete]);

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
        <button type="button" onClick={handleToggleCamera}>
          Cambiar a {cameraFacingMode === 'user' ? 'cámara trasera' : 'cámara frontal'}
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
