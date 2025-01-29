import React, { useState, useRef, useCallback } from 'react';
import { Camera, StopCircle, RefreshCcw, Send, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { storeTestimonialVideo } from '@/services/api/api';
import axios from 'axios';

const VideoTestimonial = () => {
    const [recordingStatus, setRecordingStatus] = useState('idle'); // idle, recording, preview, uploading
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    const mediaRecorderRef = useRef(null);
    const videoPreviewRef = useRef(null);
    const streamRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const { token } = useParams();

    const startRecording = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user"
                },
                audio: true
            });

            streamRef.current = stream;
            const videoPreview = videoPreviewRef.current;
            videoPreview.srcObject = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.start();
            setRecordingStatus('recording');

            // Start timer
            setTimeElapsed(0);
            timerRef.current = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);

        } catch (err) {
            setError('Unable to access camera. Please ensure you have granted permission.');
            console.error('Error accessing media devices:', err);
        }
    };

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && recordingStatus === 'recording') {
            mediaRecorderRef.current.stop();
            streamRef.current.getTracks().forEach(track => track.stop());
            clearInterval(timerRef.current);

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const videoURL = URL.createObjectURL(blob);
                const file = new File([blob], "recording.mp4", { type: "video/mp4" });
                setVideoFile(file)
                videoPreviewRef.current.srcObject = null;
                videoPreviewRef.current.src = videoURL;
                setRecordingStatus('preview');
            };
        }
    }, [recordingStatus]);

    const resetRecording = () => {
        setRecordingStatus('idle');
        setError(null);
        setUploadProgress(0);
        chunksRef.current = [];
        if (videoPreviewRef.current) {
            videoPreviewRef.current.src = '';
        }
    };

    const uploadVideo = async () => {
        let percent = 0;
        setRecordingStatus('uploading');

        const f = new FormData();
        f.append('video', videoFile)
        f.append('token', token);
        const api = axios.create({
            baseURL: API_BASE_URL + "/api",
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        await api.post("/testimonial/video", f, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                percent = Math.floor((loaded * 100) / total);
                setUploadProgress(percent);
            }
        });

        resetRecording();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card className="overflow-hidden">
                <CardHeader className="text-center mb-">
                    <CardTitle>Record Testimonial</CardTitle>
                </CardHeader>
                <CardContent className="pl-6 pr-6 pb-6">
                    <div className="aspect-video bg-[#acc8ac] rounded-lg overflow-hidden relative">
                        <video
                            ref={videoPreviewRef}
                            autoPlay
                            playsInline
                            muted={recordingStatus === 'recording'}
                            className="w-full h-full object-cover"
                        />

                        {recordingStatus === 'recording' && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                {formatTime(timeElapsed)}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                        {recordingStatus === 'idle' && (
                            <Button
                                size="lg"
                                onClick={startRecording}
                                className="bg-[#2b4033] hover:bg-[#1e3728] text-white"
                            >
                                <Camera className="mr-2 h-5 w-5" />
                                Start Recording
                            </Button>
                        )}

                        {recordingStatus === 'recording' && (
                            <Button
                                size="lg"
                                variant="destructive"
                                onClick={stopRecording}
                            >
                                <StopCircle className="mr-2 h-5 w-5" />
                                Stop Recording
                            </Button>
                        )}

                        {recordingStatus === 'preview' && (
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={resetRecording}
                                >
                                    <RefreshCcw className="mr-2 h-5 w-5" />
                                    Record Again
                                </Button>
                                <Button
                                    size="lg"
                                    className="bg-[#2b4033] hover:bg-[#1e3728] text-white"
                                    onClick={uploadVideo}
                                >
                                    <Send className="mr-2 h-5 w-5" />
                                    Submit Testimonial
                                </Button>
                            </div>
                        )}
                    </div>

                    {recordingStatus === 'uploading' && (
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Uploading video...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} />
                        </div>
                    )}
                </CardContent>
            </Card>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="text-sm text-slate-500">
                <h3 className="font-medium mb-2">Tips for a great testimonial:</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Find a quiet, well-lit location</li>
                    <li>Position yourself in the center of the frame</li>
                    <li>Speak clearly and at a natural pace</li>
                    <li>Keep your testimonial between 1-3 minutes</li>
                </ul>
            </div>
        </div>
    );
};

export default VideoTestimonial;