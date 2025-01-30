import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Camera, StopCircle, SwitchCamera, Trash, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/services/helpers/helpers';

const VideoRecorder = ({ onStopRecording, prevVideo = null }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [oldVid, setOldVid] =  useState(prevVideo)
    const [videoBlob, setVideoBlob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const MAX_RECORDING_TIME = 600; // 10 minutes = 600 seconds

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
            setOldVid(null);
            
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
            setIsVisible(false)
        }
    };

    const removeVideo = () => {
        setVideoBlob(null)
        setIsVisible(true);
        setRecordingTime(0)
    }
    
    return (
        <>
            <Button
                onClick={() => setIsModalOpen(true)}
                className=" bg-[#A02334] hover:bg-[#8a1e2c] text-white"
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
                            {(!isRecording && oldVid != null) && 
                                <video
                                    src={getImageUrl(prevVideo)}
                                    controls
                                    className="w-full aspect-video mb-4"
                                ></video>
                            }
                            {(isVisible && oldVid == null) &&
                                <div className="bg-[#94a49c58] rounded mb-4 overflow-hidden">
                                    <video
                                        ref={videoRef}
                                        className="w-full aspect-video"
                                        muted
                                    ></video>
                                    {!isRecording &&
                                        <div className="absolute top-[16vh] left-[4vw] prose prose-gray">
                                            <p className='text-'>You are required to record a <span className='text-red-600'>10-minute (Maximum)</span> career video articulating the following:</p>
                                            <ul className='text-sm marker:text-[#546154] list-decimal'>
                                                <li>Technical skills: Specific job-related abilities and expertise.</li>
                                                <li>Soft skills: Personality traits, interpersonal skills, and other non-technical attributes (e.g., communication, leadership, teamwork).</li>
                                                <li>Past experience: Details about your previous roles and responsibilities.</li>
                                                <li>Career goals: Your aspirations and plans for professional growth.</li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                            }

                            {isRecording && (
                                <div className="text-center text-red-500 mb-4 text-2xl font-bold">
                                    {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
                                </div>
                            )}

                            {videoBlob ? (
                                <video
                                    src={URL.createObjectURL(videoBlob)}
                                    controls
                                    className="w-full aspect-video mb-4"
                                ></video>
                            ) : null}

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

                                {videoBlob ? (
                                    <div>
                                        <Button
                                            onClick={removeVideo}
                                            variant="destructive"
                                        >

                                            <Trash strokeWidth={2.5} className="mr-2" /> Remove  video
                                        </Button>
                                    </div>

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