import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  StopCircle,
  PlayCircle,
  Check
} from 'lucide-react';
import VideoRecorder from './VideoRecording';


const VideoInterview = ({ chosenQuestions, endProcess }) => {
  const [questions, setQuestions] = useState(chosenQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [recordedVideosFile, setRecordedVideosFile] = useState([]);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question completed
      submitInterview();
    }
  };

  const handleStopRecording = (file, blob) => {
    const videoUrl = URL.createObjectURL(blob);
    setRecordedVideos(prev => [...prev, videoUrl]);
    setRecordedVideosFile(prev => [...prev, {file:file,  qtn: questions[currentQuestionIndex]}]);
  }

  const submitInterview = () => {
    const formData = new FormData();
    recordedVideosFile.forEach((obj, i) => {
      formData.append(`video-${i}`, obj.file);
      formData.append(`qtn-${i}`, obj.qtn);
    });
    endProcess();
  }

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

          <VideoRecorder onStopRecording={handleStopRecording} />


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
                <Check className="mr-2" />{recordedVideos.length == 6 ? 'Finish' : 'Next Question'} 
              </Button>
            )}
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}

export default VideoInterview;