import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLinkedin, FaInfoCircle, FaCamera } from "react-icons/fa";
import {
  fetchSkills,
  fetchEducationLevels,
  fetchSkillLevels,
  fetchYearsOfExperiences,
  fetchIndustrys,
  linkedInLogin,
  registerJobseeker
} from "@/services/api/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RiErrorWarningFill } from "react-icons/ri";
import { RiRobot2Fill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import logo from '@/assets/images/logo.png'
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import VideoRecorder from "@/pages/jobseeker/VideoRecording";
import { PulseLoader } from "react-spinners";
import ErrorToast from "@/components/toasts/error";
import HeaderNav from "../header/header";
import { io } from "socket.io-client";
import SuccessToast from "@/components/toasts/success";

export default function RegisterJobSeekerPage() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    professionalTitle: "", //
    industry: "", //
    educationLevel: "", //
    yearsOfExperience: "", // 
    skillLevel: "", // 
    skills: {}, //
    aboutYourself: "", //
    video: null, //
    profilePicture: null, //
    termsAccepted: false,
  });

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [skills, setSkills] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [yearsOfExperiences, setYearsOfExperience] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [percentage, setPercentage] = useState(0);
  const [showRecorder, setShowRecorder] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [open, setOpen] = useState(false);
  const [videoRequired, setVideoRequired] = useState(false);
  const [openUploadStatus, setOpenUploadStatus] = useState(false);
  const [videoStatus, setVideoStatus] = useState(true);
  const [videoStatusLoading, setVideoStatusLoading] = useState(false);
  const change = false;
  const [emailData,  setEmailData] = useState(null);
 
  // const handleStartRecording = () => {
  //   setShowRecorder(true);
  //   setVideoUrl(false);
  // };

  const handleStopRecording = (url, blob) => {
    setVideoUrl(url);
    setVideoSource(blob);
    setFormData(prev => ({ ...prev, video: blob }));
    setShowRecorder(false);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  }

  const filterActiveStatus = (data) => {
    return data.filter(item => item.status === 1);
  };

  const setIoUserId = () => { 
    const userId = Math.floor(Math.random() * 10001);
    sessionStorage.setItem('ioUserId', userId);
    return userId;
  }

  useEffect(() => {
    setIoUserId();
  }, [change]);

  // Fetch data with error handling and display meaningful messages
  useEffect(() => {
    const ioUserId = sessionStorage.getItem('ioUserId');
    console.log(ioUserId);

    const socket = io(API_BASE_URL, {
      query: { userId: ioUserId }, // Pass the userId as a query parameter
    });

    socket.on('video-status-update', (data) => {
      try {
        setOpenUploadStatus(true);
        console.log('Received update:', data.percentage);
        setPercentage(data.percentage)
        if (data.percentage == 100 && data.error == null) {
          SuccessToast("Update profile successful!");
          setVideoSource(null)
          setOpenUploadStatus(false);
          sessionStorage.setItem('pendingVerificationEmail', emailData);
          navigate('/jobseeker/verify');
        } else {
          setVideoStatusLoading(false);
          setVideoStatus(false);
        }
      } catch (error) {
        console.log(error)
      }
    });

    const fetchData = async () => {
      try {
        const [
          skillsData,
          industriesData,
          educationData,
          yearsData,
          skillData,
        ] = await Promise.all([
          fetchSkills(),
          fetchIndustrys(),
          fetchEducationLevels(),
          fetchYearsOfExperiences(),
          fetchSkillLevels(),
        ]);

        setSkills(filterActiveStatus(skillsData.data.data));
        setIndustries(filterActiveStatus(industriesData.data.data));
        setEducationLevels(filterActiveStatus(educationData.data.data));
        setYearsOfExperience(filterActiveStatus(yearsData.data.data));
        setSkillLevels(filterActiveStatus(skillData.data.data));
      } catch (err) {
        ErrorToast("Failed to load form data. Please refresh the page.")

        console.error("Error fetching form data:", err);
      }
    };

    fetchData();
  }, []);

  // Optimized handleChange function
  const handleChange = (e) => {
    const { name, value, checked, type, files, } = e.target;

    if (name == "email") {
      setEmailData(value);
    }
    setFormData((prev) => {
      if (type === "file") {
        if (name == 'video') {
          setVideoSource(files[0]);
        }

        return { ...prev, [name]: files[0] };
      } else if (name.startsWith("skills.")) {
        // get data-id of skill input
        const skillId = e.target.getAttribute("data-id");
        const skill = skills.find((s) => s.id == skillId);

        if (checked) {
          return {
            ...prev,
            skills: {
              ...prev.skills,
              [skillId]: { id: skill.id, name: skill.name },
            },
          };
        } else {
          const { [skillId]: _, ...restSkills } = prev.skills; // Remove unchecked skill
          return { ...prev, skills: restSkills };
        }
      } else {
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };
      }
    });
  };

  // Validation function
  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.professionalTitle
    ) {
      return "Please fill in all required fields.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.termsAccepted) {
      return "You must accept the terms and conditions.";
    }
    if (
      formData.profilePicture &&
      formData.profilePicture.size > 2 * 1024 * 1024
    ) {
      return "Profile picture must be under 2MB.";
    }
    if (formData.video && formData.video.size > 100 * 1024 * 1024) {
      return "Introduction video must be under 10MB.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let percent = 0;
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const profileData = new FormData();
    profileData.append("ioUserId", sessionStorage.getItem('ioUserId'));

    // Append all other fields
    Object.keys(formData).forEach((key) => {
      if (key === "skills") {
        const selectedSkills = Object.values(formData.skills);
        profileData.append(key, JSON.stringify(selectedSkills));
      } else if (key !== "profilePicture" && key !== "video") {
        profileData.append(key, formData[key]);
      }
    });

    // Append files separately
    if (formData.profilePicture) {
      profileData.append("profilePicture", formData.profilePicture);
    }

    if (formData.video) {
      profileData.append("video", formData.video);
      setVideoRequired(false);
    } else {
      setVideoRequired(true);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const api = axios.create({
        baseURL: API_BASE_URL + "/api",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      await api.post("/auth/jobseeker-register", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          percent = Math.floor((loaded * 100) / total);
          console.log("options");
          console.log(percent);
          // if (percent < 100) {
          //   console.log(percent);
          //   setPercentage(percent)
          // }
        }
      });
      setIsSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        professionalTitle: "",
        industry: "",
        educationLevel: "",
        yearsOfExperience: "",
        skillLevel: "",
        skills: {},
        aboutYourself: "",
        video: null,
        profilePicture: null,
        termsAccepted: false,
      });

    } catch (err) {
      // setError(
      //   err.response?.data?.message || "Registration failed. Please try again."
      // );
      ErrorToast(err.response?.data?.error || "Registration failed. Please try again.")

      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleLinkedInLogin = async () => {
    await linkedInLogin("job_seeker");
  };

  const profilePhotoPreview =
    formData.profilePicture instanceof File
      ? URL.createObjectURL(formData.profilePicture)
      : formData.profilePicture;

  return (
    <div>
      <HeaderNav />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-2">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 space-y-6">
          {/* Title and LinkedIn Button */}
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Create Your Job Seeker Profile
          </h1>
          <div className="text-center">
            <Button
              onClick={handleLinkedInLogin}
              className="bg-blue-400 text-white w-full flex items-center gap-2 md:w-auto mx-auto"
            >
              <FaLinkedin className="text-xl" />
              Connect with LinkedIn
            </Button>
          </div>
          <div className="text-center text-gray-500">or</div>

          {/* Profile Picture */}
          <div className="flex justify-center">
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
                onChange={handleChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name and Contact */}
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                name="fullName"
                required
                onChange={handleChange}
                defaultValue={formData.fullName}
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  defaultValue={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                placeholder="Street Address"
                type="text"
                name="address"
                defaultValue={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="City"
                  name="city"
                  type="text"
                  onChange={handleChange}
                  defaultValue={formData.city}
                />
              </div>
              <div>
                <Input
                  placeholder="State"
                  type="text"
                  name="state"
                  onChange={handleChange}
                  defaultValue={formData.state}
                />
              </div>
              <div>
                <Input
                  placeholder="ZIP Code"
                  type="text"
                  name="zipCode"
                  onChange={handleChange}
                  defaultValue={formData.zipCode}
                />
              </div>
            </div>

            {/* Professional Title */}
            <div>
              <Label htmlFor="professionalTitle">Professional Title</Label>
              <Input
                id="professionalTitle"
                type="text"
                required
                name="professionalTitle"
                onChange={handleChange}
                defaultValue={formData.professionalTitle}
              />
            </div>

            {/* Dropdowns */}
            <div>
              <Label htmlFor="industry">Industry</Label>
              <select
                name="industry"
                className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Select Industry</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="educationLevel">Education Level</Label>
              <select
                name="educationLevel"
                className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm"
                value={formData.educationLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Education Level</option>
                {educationLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <select
                name="yearsOfExperience"
                className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
              >
                <option value="">Select Years of Experience</option>
                {yearsOfExperiences.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="skillLevel">Skill Level</Label>
              <select
                name="skillLevel"
                className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm"
                value={formData.skillLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Skill Level</option>
                {skillLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div>
              <Label>Skills</Label>
              <div className="grid grid-cols-2 mt-2 mb-4 md:grid-cols-3 gap-2">
                {skills.map((skill) => (
                  <label key={skill.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      data-id={skill.id}
                      name={`skills.${skill.id}`}
                      checked={formData.skills[skill.id] || false}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <span>{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tell us about yourself */}
            <div>
              <Label htmlFor="about">Tell us about yourself</Label>
              <Textarea
                name="aboutYourself"
                id="about"
                className="mt-2"
                defaultValue={formData.aboutYourself}
                onChange={handleChange}
                required
              />
            </div>

            {/* Introduction Video */}
            <div className="space-y-2">
              <Label>Introduction Video</Label>
              {!showRecorder && (
                <div className="">
                  <VideoRecorder open={open} setOpen={setOpen} onStopRecording={handleStopRecording} onCancelRecording={handleCancelRecording} />
                </div>
              )}
              {
                videoRequired && (
                  <p className="text-red-500">Please record an introduction video</p>
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

              <ul className="text-gray-600 text-sm space-y-1">
                <li className="flex items-center mb-4 gap-2 text-gray-700">
                  <RiErrorWarningFill className="text-gray-700 w-4 h-4" /> All
                  videos will be edited with AI to ensure consistent quality.
                </li>
                <li className="flex items-center mb-2 gap-2 text-gray-700">
                  <RiRobot2Fill className="text-gray-700 w-4 h-4" /> Videos will
                  be analyzed by AI for content moderation and quality assessment.
                </li>
              </ul>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-10">
              <div className="flex pt-2 space-x-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1"
                  required
                />
                <Label htmlFor="terms">
                  I agree to the terms and conditions <br />
                  <br />
                  <span className="text-gray-500">
                    By checking this box, I confirm that I have read and
                    understood all disclaimers, and I agree that my profile
                    information and video content may be processed and analyzed by
                    AI systems.
                  </span>
                </Label>
              </div>
            </div>

            

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white"
            >
              {loading ? <PulseLoader size={8} color="#ffffff" /> : "Create Profile"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-800"
              onClick={() => navigate('/jobseeker/login')}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
      <StatusModal isOpen={openUploadStatus}  percentage={percentage} />
    </div>
  );
}


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
