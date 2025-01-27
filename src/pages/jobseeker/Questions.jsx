import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, StopCircle, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { storeQuestions } from "@/services/api/api";
import { formatTime } from "@/services/helpers/helpers";
import { PulseLoader } from "react-spinners";

const VideoInterview = ({ chosenQuestions, endProcess }) => {
  const MAX_RECORDING_TIME = 120;
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const { user } = useAuth();

  const questions = chosenQuestions;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setVideoBlob(blob);
        setVideoUrl(URL.createObjectURL(blob));
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev == MAX_RECORDING_TIME || prev > MAX_RECORDING_TIME) {
            mediaRecorderRef.current.stop();
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            setRecording(false);
            clearInterval(timerRef.current);
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (!videoBlob) return;

    setIsSubmitting(true);
    try {
      const file = new File([videoBlob], user.id + "recording.mp4", { type: "video/mp4" });
      const formData = new FormData();
      formData.append("video", file);
      formData.append("questions", JSON.stringify(questions));
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await storeQuestions(formData);
      endProcess();
      // Reset state after successful submission
      setVideoBlob(null);
      setVideoUrl(null);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting recording:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
          Interview Practice Session
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Recording Section */}
          <div className="space-y-4">
            {!videoUrl && (
              <Card>
                <CardContent className="p-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-[220px] sm:h-[300px] md:h-[400px] bg-gray-900 rounded-lg object-cover"
                  />
                  <div className="mt-4 flex justify-center gap-4">
                    {!recording ? (
                      <Button
                        onClick={startRecording}
                        className="bg-red-500 hover:bg-red-600 w-full md:w-auto text-sm"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : (

                      <div>
                        <div className="text-center text-red-500 mb-4 text-2xl font-bold">
                          {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
                        </div>
                        <Button
                          onClick={stopRecording}
                          variant="destructive"
                          className="w-full md:w-auto text-sm"
                        >
                          <StopCircle className="mr-2 h-4 w-4" />
                          Stop Recording
                        </Button>
                      </div>

                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            {videoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Your Recording</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                  <video
                    src={videoUrl}
                    controls
                    className="w-full  bg-[#abd2ab] rounded aspect-video h-[220px] sm:h-[300px] md:h-[400px]"
                  />
                  </div>
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-[#2b4033] hover:bg-[#1e3728] text-sm"
                  >
                    {isSubmitting ? (
                      <>
                         <PulseLoader size={8} color="#ffffff" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Recording"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Questions Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Interview Questions</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Here are the selected questions for your interview practice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full h-[300px] sm:h-[360px]">
                  <div className="space-y-4 ">
                    {questions.map((question, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <span className="font-medium text-gray-600 text-sm sm:text-base">
                          Q{index + 1}:
                        </span>
                        <p className="mt-1 text-sm sm:text-base">{question}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;