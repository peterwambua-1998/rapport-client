import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Camera, StopCircle, SwitchCamera, Trash, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/services/helpers/helpers';

const VideoRecorder = ({ onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const MAX_RECORDING_TIME = 120; // 10 minutes = 600 seconds

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const file = new File([blob], "recording.mp4", { type: "video/mp4" });
        setVideoBlob(blob);
        onStopRecording(file, blob);
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        clearInterval(timerRef.current);
        setVideoBlob(null)
        setIsVisible(true);
        setRecordingTime(0)
        setIsModalOpen(false)
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev == MAX_RECORDING_TIME || prev > MAX_RECORDING_TIME) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
            setIsVisible(false)
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert('Could not access camera or microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setVideoBlob(null)
      setIsVisible(true);
      setRecordingTime(0)
      setIsModalOpen(false)
    }
  };


  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className=" bg-[#94a48c] hover:bg-[#7e8b77] text-black/70"
      >
        <Camera strokeWidth={2.4} className="mr-2" /> Record Video
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Record Your Video</h2>

              {(isVisible) &&
                <div className="bg-[#94a49c58] rounded mb-4 overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full aspect-video"
                    muted
                  ></video>
                </div>
              }

              {isRecording && (
                <div className="text-center text-red-500 mb-4 text-2xl font-bold">
                  {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
                </div>
              )}

              {/* {videoBlob ? (
                                <video
                                    src={URL.createObjectURL(videoBlob)}
                                    controls
                                    className="w-full aspect-video mb-4"
                                ></video>
                            ) : null} */}

              <div className="flex justify-center space-x-4">
                {!isRecording && !videoBlob ? (
                  <Button
                    onClick={startRecording}
                    className=" bg-[#2b4033] hover:bg-[#1e3728] text-white "
                  >

                    <Camera strokeWidth={2.5} className="mr-2" /> Start Recording
                  </Button>
                ) : null}

                {isRecording ? (
                  <Button
                    onClick={stopRecording}
                    variant="destructive"
                  >
                    <StopCircle className="mr-2" /> Stop Recording
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoRecorder;