import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  StopCircle, 
  PlayCircle, 
  Check 
} from 'lucide-react';

const questions = [
  "Tell me about your professional journey",
  "What motivates you in your career?",
  "Describe a challenging project you've worked on",
  "What are your career goals?",
  "How do you approach problem-solving?"
];

export default function VideoInterview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    // Request camera access
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        const recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };
        
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(blob);
          
          setRecordedVideos(prev => [...prev, videoUrl]);
          chunksRef.current = [];
        };
        
        setMediaRecorder(recorder);
        mediaRecorderRef.current = recorder;
      }
    }
    
    setupCamera();
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto stop after 2 minutes
      setTimeout(() => {
        stopRecording();
      }, 120000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const isNextEnabled = recordedVideos.length === currentQuestionIndex + 1;

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Video Interview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-center font-semibold">
            {questions[currentQuestionIndex]}
          </p>
          
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            className="w-full rounded-lg"
          />
          
          <div className="flex justify-center space-x-4">
            {!isRecording ? (
              <Button 
                onClick={startRecording} 
                variant="outline"
                disabled={isRecording}
              >
                <Camera className="mr-2" /> Start Recording
              </Button>
            ) : (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
              >
                <StopCircle className="mr-2" /> Stop Recording
              </Button>
            )}
          </div>
          
          {recordedVideos[currentQuestionIndex] && (
            <video 
              src={recordedVideos[currentQuestionIndex]} 
              controls 
              className="w-full rounded-lg mt-4"
            />
          )}
          
          <div className="flex justify-between">
            {recordedVideos[currentQuestionIndex] && isNextEnabled && (
              <Button 
                onClick={nextQuestion}
                className="w-full"
              >
                <Check className="mr-2" /> Next Question
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}