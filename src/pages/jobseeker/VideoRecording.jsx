import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/toasts/error";

const VideoRecorder = ({ onStopRecording, onCancelRecording, open, setOpen }) => {
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      setDevices(deviceInfos.filter((device) => device.kind === "videoinput"));
    };
    fetchDevices();

    return () => {
      cleanupRecording();
    };
  }, []);

  useEffect(() => {
    if (!open && isRecording) {
      cleanupRecording();
    }
  }, [open]);

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
    setIsRecording(true);
    if (!videoUrl) {
      setIsVisible(true);
    }
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
        const blob = new Blob(recordedChunks.current, { type: "video/mp4" });
        const vidUrl = URL.createObjectURL(blob);
        const file = new File([blob], "recording.mp4", { type: "video/mp4" });
        setVideoUrl(vidUrl);
        onStopRecording(vidUrl, file);
        setIsVisible(false);
        recordedChunks.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsPaused(false);
      startTimer();
    } catch (error) {
      console.log(error)
      ErrorToast("We encountered an issue accessing your camera or microphone. Please ensure they are connected and permissions are granted.");
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
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };


  const handleRemove = () => {
    setVideoUrl(null);
    setIsRecording(false)
    onStopRecording(null, null);
  }

  const cleanupRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsRecording(false);
    setIsPaused(false);
    setIsVisible(false);
    recordedChunks.current = [];
    setRecordingTime(0);
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={(newOpen) => {
        if (!newOpen && isRecording) {
          cleanupRecording();
        }
        setOpen(newOpen);
      }}>
        <DialogTrigger asChild>
          <Button variant="default" type="button" className="bg-blue-500">
            {videoUrl == null ? 'Record Video': 'View Recording'}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[80vw] md:max-w-[70vw] lg:max-w-[70vw]">
          <DialogHeader>
            <DialogTitle>Video recorder</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
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
                    className="p-2 border rounded w-full"
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
            <video src={videoUrl} controls className="w-full h-[50vh] border mb-2" />
          )}

          {isVisible && <video ref={videoRef} autoPlay muted className="w-full h-[50vh] border mb-4" />}

          {isRecording && (
            <>
              <p className="mb-4">Recording Time: {recordingTime}s</p>
              <div className="flex mb-0 space-x-4">
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
          <DialogFooter>
            {
              videoUrl == null ? (
                <></>
              ) : <Button type="button" variant="destructive" onClick={handleRemove}>Remove recording</Button>
            }
            <Button type="button" onClick={() => setOpen(false)}>close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default VideoRecorder;
