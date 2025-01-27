import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { storePersonalInfo } from "@/services/api/api";
import { ChevronRight, Download, GraduationCap, MapPin, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { PulseLoader } from "react-spinners";
import { io } from "socket.io-client";
import VideoRecorder from "./videoRecorder";
import { getImageUrl } from "@/services/helpers/helpers";


const PersonalInfo = ({ dataSourceResult, setActiveTab }) => {
    const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
    const { user } = useAuth();
    const fileInputRef = useRef(null);
    const [openUploadStatus, setOpenUploadStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [percentage, setPercentage] = useState(0);
    
    const [data, setData] = useState({
        about: dataSourceResult.AboutMe ? dataSourceResult.AboutMe : "",
        location: dataSourceResult.Location ? dataSourceResult.Location : "",
        industry: dataSourceResult.Industry ? dataSourceResult.Industry : "",
        video: dataSourceResult.videoUrl ? dataSourceResult.videoUrl : null,
        profilePicture: dataSourceResult.profilePhotoUrl ? dataSourceResult.profilePhotoUrl : null,
    });


    useEffect(() => {
        console.log(dataSourceResult)
        const socket = io(API_BASE_URL, {
            query: { userId: user.id }, // Pass the userId as a query parameter
        });

        socket.on('video-status-update', (data) => {
            try {
                setOpenUploadStatus(true);
                setPercentage(data.percentage)
                if (data.percentage == 100 && data.error == null) {
                    SuccessToast("Your data has been stored. You can continue with other tabs.");
                    setOpenUploadStatus(false);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error)
            }
        });
    }, []);

    const handleInputChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const newErrors = {
            about: data.about === "",
            location: data.location === "",
            industry: data.industry === "",
            video: data.video === null,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };


    const submitData = async (e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                setLoading(true);
                const f = new FormData();
                f.append('about', data.about)
                f.append('location', data.location)
                f.append('industry', data.industry)
                f.append('video', data.video)
                f.append('profilePicture', data.profilePicture)
                const res = await storePersonalInfo(f);
                setActiveTab('professional')
                setLoading(false);
                SuccessToast('Your data has been stored. You can continue with other tabs.')
            }
        } catch (error) {
            console.log(error);
            ErrorToast("Error occurred refresh and try again.");
        }
    };

    // For video recording
    const handleStopRecording = (file, blob = null) => {
        setVideoFile(file);
        setData((prev) => ({ ...prev, video: file }));
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const profilePhotoPreview =
        data.profilePicture instanceof File
            ? URL.createObjectURL(data.profilePicture)
            : data.profilePicture ? getImageUrl(data.profilePicture) : null;

    return (
        <TabsContent value="personal" className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <div className="relative">
                        <div className="bg-gray-100 border border-gray-300 w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
                            {profilePhotoPreview ? (
                                <img
                                    src={profilePhotoPreview}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <span className="text-gray-400 text-4xl">
                                    <IoPersonSharp />
                                </span>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleButtonClick}
                            className="absolute bottom-0 w-8 h-8 right-0 bg-blue-600 text-white rounded-full p-1 flex items-center justify-center"
                        >
                            <FaCamera className="w-4 h-4" />
                        </Button>
                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            onChange={(e) => handleInputChange('profilePicture', e.target.files[0])}
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Introduction Video</Label>
                    <div className="">
                        <VideoRecorder onStopRecording={handleStopRecording} prevVideo={data.video} />
                    </div>
                    {
                        errors.video && (
                            <p className="text-red-500 text-sm">Please record an introduction video</p>
                        )
                    }

                    {/* {videoSource && (
                        <div>
                        {typeof videoSource === 'string' ? (
                            <video src={videoSource} controls width="320" height="240" />
                        ) : (
                            <video src={URL.createObjectURL(videoSource)} controls width="320" height="240" />
                        )}
                        </div>
                    )} */}

                    {/* <ul className="text-gray-600 text-sm space-y-1">
                        <li className="flex items-center mb-4 gap-2 text-gray-700">
                        <RiErrorWarningFill className="text-gray-700 w-4 h-4" /> All
                        videos will be edited with AI to ensure consistent quality.
                        </li>
                        <li className="flex items-center mb-2 gap-2 text-gray-700">
                        <RiRobot2Fill className="text-gray-700 w-4 h-4" /> Videos will
                        be analyzed by AI for content moderation and quality assessment.
                        </li>
                    </ul> */}
                </div>
            </div>

            {/* About Me */}
            <div className="space-y-2">
                <Label className="text-lg font-semibold">About Me</Label>
                <Textarea
                    value={data.about}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    placeholder="Share your professional journey, passions, and what drives you..."
                    className="min-h-[150px] resize-none border-slate-400 "
                />
                {errors.about && (
                    <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                )}
            </div>

            {/* Location and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                        value={data.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="City, Country"
                        className="bg-white border-slate-400 "
                    />
                    {errors.location && (
                        <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input
                        value={data.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        placeholder="Enter industry"
                        className="bg-white border-slate-400 "
                    />
                    {errors.industry && (
                        <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                    )}
                </div>
            </div>

            <StatusModal isOpen={openUploadStatus} percentage={percentage} />

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 pt-4 border-t border-gray-400">
                {/* <Button variant="outline">Save Draft</Button> */}
                <Button onClick={submitData} className="bg-[#2b4033] hover:bg-[#1e3728] text-white">
                    {loading ? <PulseLoader size={8} color="#ffffff" /> : <span>
                        Save <Download className="ml-2 h-4 w-4 inline" />
                    </span>}
                </Button>
            </div>
        </TabsContent>
    );
}

export default PersonalInfo;

const StatusModal = ({ isOpen, percentage }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-hidden h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                        Upload status
                    </h3>
                    <Progress value={percentage} />
                    <p>{percentage}%</p>
                    <p className="text-sm mt-4">Upload in progress please be patient...</p>
                </div>
            </div>
        </div>
    )
}
