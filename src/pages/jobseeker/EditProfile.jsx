import React, { useState, useEffect, useRef } from "react";
import {
  fetchSkills,
  fetchEducationLevels,
  fetchSkillLevels,
  fetchYearsOfExperiences,
  fetchIndustrys,
  updateSeekerProfile,
  getProfile,
  getProfileMs
} from "@/services/api/api";
import { getImageUrl } from "@/services/helpers/helpers";
import { IoPersonSharp } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import VideoRecorder from "@/pages/jobseeker/VideoRecording";

const EditProfile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    profileVisible: false,
    activeStatus: false,
    photo: "",
    experience: false,
    education: false,
    user_skills: false,
    video_introduction: false,
    basic_information: false,
    layout_style: "",
    color: "",
  });

  const [skills, setSkills] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [yearsOfExperiences, setYearsOfExperience] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [percentage, setPercentage] = useState(0)
  const [showRecorder, setShowRecorder] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoSource, setVideoSource] = useState(null);

  const handleStartRecording = () => {
    setShowRecorder(true);
    setVideoUrl(false);
  };

  const handleStopRecording = (url, blob) => {
    setVideoUrl(url);
    setVideoSource(blob);
    setFormData(prev => ({ ...prev, video: blob }));
    setShowRecorder(false);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  }


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleButtonClickVideo = () => {
    videoInputRef.current.click();
  };


  const filterActiveStatus = (data) => {
    return data.filter(item => item.status === 1);
  };

  useEffect(() => {
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
        setError("Failed to load form data. Please refresh the page.");
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const seeker = response.data;
        const profile = seeker.JobSeeker;
        const visibilitySetting = seeker.VisibilitySetting;


        setFormData({
          fullName: seeker?.name || "",
          email: seeker?.email || "",
          phone: profile?.phone || "",
          address: profile?.address || "",
          city: profile?.city || "",
          state: profile?.state || "",
          zipCode: profile?.zipCode || "",
          professionalTitle: profile?.professionalTitle || "",
          industry: profile?.industry || "",
          educationLevel: profile?.educationLevel || "",
          yearsOfExperience: profile?.yearsOfExperience || "",
          skillLevel: profile?.skillLevel || "",
          skills: seeker?.JobseekerSkills.reduce((acc, skillItem) => {
            const { name, id } = skillItem.Skill;
            acc[name] = { id, name };
            return acc;
          }, {}),
          aboutYourself: profile?.about || "",
          video: profile?.videoUrl || "",
          profilePicture: "",
          profileVisible: profile?.profileVisible || false,
          activeStatus: profile?.activeStatus || false,
          photo: seeker?.avatar || "",
          experience: visibilitySetting?.experience || false,
          education: visibilitySetting?.education || false,
          user_skills: visibilitySetting?.skills || false,
          video_introduction: visibilitySetting?.videoIntro || false,
          basic_information: visibilitySetting?.basicInfo || false,
          layout_style: profile?.layoutStyle || "",
          color: profile?.backgroundColor || "",
        });
      } catch (error) {
        setMessage({ type: "error", text: "Failed to load profile." });
      }
    };
    fetchProfile();
    fetchData();
  }, []);

  // Optimized handleChange function
  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;
    if (name != "") {
      setFormData((prev) => {
        if (type === "file") {
          if (type === "file" && files.length > 0) {
            if (name == 'video') {
              setVideoSource(files[0]);
            }
            return { ...prev, [name]: files[0] };
          } else if (type === "file" && files.length === 0) {
            return { ...prev, [name]: "" }; // Clear file if empty
          }
          // return { ...prev, [name]: files[0] };
        } else if (name.startsWith("skills.")) {
          const skillName = name.split(".")[1];
          const skill = skills.find((s) => s.name === skillName);

          if (checked) {
            return {
              ...prev,
              skills: {
                ...prev.skills,
                [skillName]: { id: skill.id, name: skill.name },
              },
            };
          } else {
            const { [skillName]: _, ...restSkills } = prev.skills; // Remove unchecked skill
            return { ...prev, skills: restSkills };
          }
        } else {
          return {
            ...prev,
            [name]: type === "checkbox" ? checked : value,
          };
        }
      });
    }
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
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const profileData = new FormData();

    // Append all other fields
    Object.keys(formData).forEach((key) => {
      if (key === "skills") {
        const selectedSkills = Object.values(formData.skills);
        profileData.append(key, JSON.stringify(selectedSkills)); // Submit as an array of objects
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
    }

    try {
      setError(null);
      setLoading(true);

      const prof = await updateSeekerProfile(profileData);
      const api = axios.create({
        baseURL: API_BASE_URL + "/api",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      await api.put(`users/seekerprofile`, profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          percent = Math.floor((loaded * 100) / total);
          console.log("options");
          console.log(percent);
          if (percent < 100) {
            console.log(percent);
            setPercentage(percent)
          }
        }
      });

      setPercentage(0)
      const page = searchParams.get("p");
      const me = await getProfileMs();
      alert("Update profile successful!");
      if (prof && me.data && page) {
        navigate('/jobseeker/dashboard');
      }
    } catch (err) {
      console.log(err)
      setError(
        err.response?.data?.message ||
        "Profile update failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const profilePhotoPreview =
    formData.profilePicture instanceof File
      ? URL.createObjectURL(formData.profilePicture)
      : formData.photo ? getImageUrl(formData.photo) : '';

  const profileVideoPreview =
    formData.video instanceof File
      ? URL.createObjectURL(formData.video)
      : formData.video ? getImageUrl(formData.video) : '';

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
          <div className="col-span-2 flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Update Profile</h1>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="profileVisible"
                  name="profileVisible"
                  checked={formData.profileVisible}
                  onChange={handleChange}
                />
                <label htmlFor="profileVisible" className="text-sm">
                  Profile Visible
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="activeStatus"
                  name="activeStatus"
                  checked={formData.activeStatus}
                  onChange={handleChange}
                />
                <label htmlFor="activeStatus" className="text-sm">
                  Active Status
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 col-span-2">
              <div className="">
                {/* Profile Image or Placeholder */}
                <div className="bg-gray-100 text-center relative border border-gray-300 w-28 h-28 rounded-full mx-auto">
                  {profilePhotoPreview ? (
                    <img
                      src={profilePhotoPreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <IoPersonSharp className="w-6 text-gray-500 h-6" />
                    </div>
                  )}

                  {/* Camera Button */}
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer"
                  >
                    <FaCamera className="w-4 h-4" />
                  </button>

                  {/* Hidden File Input */}
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
              <div className="">

              {/* {videoSource && (
                  <div>
                    {typeof videoSource === 'string' ? (
                      <video src={videoSource} controls width="320" height="240" />
                    ) : (
                      <video src={URL.createObjectURL(videoSource)} controls width="320" height="240" />
                    )}
                  </div>
                )} */}

                {profileVideoPreview ? (
                  <div className=" w-full h-60 bg-gray-100 flex justify-center items-center border-4">
                    <video
                      src={profileVideoPreview}
                      controls
                      className="w-full h-full object-cover rounded-t-md"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  // Placeholder for when no video is available
                  <div className=" w-full h-60 bg-gray-100 flex justify-center items-center border-4">
                    <p className="text-gray-800">No video uploaded</p>
                  </div>
                )}

                {showRecorder && (
                  <div className="mt-4">
                    <VideoRecorder onStopRecording={handleStopRecording} onCancelRecording={handleCancelRecording} />
                  </div>
                )} 

                {!showRecorder && (
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      type="button" onClick={handleStartRecording}
                    >
                      Record Video
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      type="button"
                      onClick={handleButtonClickVideo}
                    >
                      Upload Video
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={handleChange}
                        name="video"
                        ref={videoInputRef}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-2">
              <div className="grid grid-cols-4 col-span-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full p-2"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border border-gray-300 rounded-md w-full p-2"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="border border-gray-300 rounded-md w-full p-2"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full p-2"
                  name="professionalTitle"
                  value={formData.professionalTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 ">
                  <label className="block text-sm font-medium mb-1">
                    Address (Optional)
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full p-2"
                    placeholder="Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full p-2"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full p-2"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full p-2"
                    placeholder="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Industry
                </label>
                <select
                  className="border border-gray-300 rounded-md w-full p-2"
                  name="industry"
                  required
                  onChange={handleChange}
                  value={formData.industry}
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
                <label className="block text-sm font-medium mb-1">
                  Education Level
                </label>
                <select
                  className="border border-gray-300 rounded-md w-full p-2"
                  name="educationLevel"
                  onChange={handleChange}
                  required
                  value={formData.educationLevel}
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
                <label className="block text-sm font-medium mb-1">
                  Years of Experience
                </label>
                <select
                  className="border border-gray-300 rounded-md w-full p-2"
                  name="yearsOfExperience"
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
                <label className="block text-sm font-medium mb-1">
                  Skill Level
                </label>
                <select
                  name="skillLevel"
                  className="border border-gray-300 rounded-md w-full p-2"
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
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Skills</label>
                <div className="grid grid-cols-3 gap-2">
                  {skills.map((skill) => (
                    <label key={skill.id} className="flex items-center">
                      <input
                        name={`skills.${skill.name}`}
                        checked={formData.skills[skill.name] || false}
                        onChange={handleChange}
                        type="checkbox"
                        className="mr-2"
                      />
                      {skill.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4 col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about yourself
                </label>
                <textarea
                  name="aboutYourself"
                  placeholder="Tell us about yourself"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
                  value={formData.aboutYourself}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Background Color
                </label>
                <input
                  name="color"
                  type="color"
                  onChange={handleChange}
                  value={formData.color}
                  className="border border-gray-300 rounded-md p-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Layout Style
                </label>
                <select
                  name="layout_style"
                  className="border border-gray-300 rounded-md w-full p-2"
                  value={formData.layout_style}
                  onChange={handleChange}
                >
                  <option value="Classic">Classic</option>
                  <option value="Modern">Modern</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Section Visibility
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="basic_information"
                      checked={formData.basic_information}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Basic Information
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="video_introduction"
                      checked={formData.video_introduction}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Video Introduction
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="user_skills"
                      checked={formData.user_skills}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Skills
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="education"
                      checked={formData.education}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Education
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="experience"
                      checked={formData.experience}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Experience
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Recommendations
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs">Recommendations</p>
                <button className="text-blue-500" type="button">
                  + Add Recommendation
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              type="submit"
            >
              Save Changes
            </button>
            <button className="px-4 py-2 border rounded-md" type="button">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
