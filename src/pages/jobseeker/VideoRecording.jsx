import React, { useState, useRef, useEffect } from "react";

const VideoRecorder = ({ onStopRecording, onCancelRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [resolution, setResolution] = useState({ width: 1280, height: 720 });
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const timerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      setDevices(deviceInfos.filter((device) => device.kind === "videoinput"));
    };
    fetchDevices();
  }, []);

  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startRecording = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDevice || undefined, ...resolution },
        audio: true,
      });

      videoRef.current.srcObject = stream;
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const vidUrl = URL.createObjectURL(blob);
        const file = new File([blob], "recording.mp4", { type: "video/mp4" });
        setVideoUrl(vidUrl);
        onStopRecording(vidUrl, file);
        recordedChunks.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    } catch (error) {
      alert("Error accessing camera or microphone: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    setIsRecording(false);
    setIsPaused(false);
    setIsVisible(false);
    stopTimer();
  };



  const pauseRecording = () => {
    mediaRecorderRef.current.pause();
    setIsPaused(true);
    stopTimer();
  };

  const resumeRecording = () => {
    mediaRecorderRef.current.resume();
    setIsPaused(false);
    startTimer();
  };

  const handleCancel = () => {
    onCancelRecording();
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Video Recorder</h1>
      {!isRecording && !videoUrl && (
        <>
          {devices.length > 0 && (
            <div className="mb-4">
              <label htmlFor="camera-select" className="block mb-2 text-sm font-medium">
                Select Camera:
              </label>
              <select
                id="camera-select"
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="p-2 border rounded"
              >
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="resolution-select" className="block mb-2 text-sm font-medium">
              Select Resolution:
            </label>
            <select
              id="resolution-select"
              onChange={(e) => setResolution(JSON.parse(e.target.value))}
              className="p-2 border rounded"
            >
              <option value='{"width":1280,"height":720}'>720p</option>
              <option value='{"width":1920,"height":1080}'>1080p</option>
            </select>
          </div>

          <button
            onClick={startRecording}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {isLoading ? "Initializing..." : "Start Recording"}
          </button>
        </>
      )}

      {videoUrl && (
        <video src={videoUrl} controls className="w-3/4 h-auto border mb-2" />
      )}

      {isVisible && <video ref={videoRef} autoPlay muted className="w-3/4 h-auto border mb-4" />}

      {isRecording && (
        <>
          <p className="mb-4">Recording Time: {recordingTime}s</p>
          <div className="flex space-x-4">
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Stop Recording
            </button>
            {!isPaused ? (
              <button
                onClick={pauseRecording}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={resumeRecording}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Resume
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoRecorder;
