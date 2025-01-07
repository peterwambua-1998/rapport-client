import React, { useState, useEffect, useRef } from "react";
import { getProfile, updateProfile } from "../../services/api/api";
import { FaCamera } from "react-icons/fa";
import { getImageUrl } from "@/services/helpers/helpers";
import defaultCoverPhoto from '@/assets/images/placeholder-cover.png'
import defaultProfilePhoto from '@/assets/images/dummyImg.png'
import { FadeLoader } from "react-spinners";
import SuccessToast from "@/components/toasts/success";
import { useUserProfile } from "@/context/userProfilePhoto";
import ErrorToast from "@/components/toasts/error";
import { Button } from "@/components/ui/button";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aboutYourself: "",
    coverPhoto: null,
    profilePhoto: null,
    company: "",
    specialization: "",
  });


  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);
  
  const { updatePhoto } = useUserProfile();
  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const profile = response.data.recruiterProfile;
      const company = profile?.Company ? profile?.Company?.name : profile?.company_name;
      setFormData({
        firstName: profile?.first_name || "",
        lastName: profile?.last_name || "",
        email: response?.data.email || "",
        aboutYourself: profile?.about || "",
        coverPhoto: response?.data.cover_photo || null,
        profilePhoto: response?.data.avatar || null,
        company: company || null,
        specialization: profile?.specialization || "",
      });
      if (response?.data.avatar) {
        updatePhoto(getImageUrl(response?.data.avatar))
      }
      setLoadingData(false)
    } catch (error) {
      console.error("Error fetching profile:", error);
      ErrorToast("Failed to load profile.");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size must be under 2MB." });
        return;
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("aboutYourself", formData.aboutYourself);
    formDataToSubmit.append("company", formData.company);
    formDataToSubmit.append("specialization", formData.specialization);

    if (formData.coverPhoto) {
      formDataToSubmit.append("coverPhoto", formData.coverPhoto);
    }

    if (formData.profilePhoto) {
      formDataToSubmit.append("profilePhoto", formData.profilePhoto);
    }

    try {
      await updateProfile(formDataToSubmit);
      await fetchProfile();
      SuccessToast("Profile updated successfully.")
    } catch (error) {
      ErrorToast("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  if (loadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FadeLoader />
        <p>Loading profile...</p>
      </div>
    )
  }

  const handlePaste = (e) => {
    // Prevent the default paste behavior
    e.preventDefault();
    
    // Get pasted content as plain text
    const text = e.clipboardData.getData('text/plain');
    
    // Clean the text: replace multiple spaces with single space
    // and remove extra line breaks
    const cleanedText = text
      .replace(/\s+/g, ' ')  // Replace multiple whitespace with single space
      .replace(/\n+/g, ' '); // Replace line breaks with space
    console.log(cleanedText);
    // Get cursor position
    const cursorPos = e.target.selectionStart;
    
    // Insert cleaned text at cursor position
    const value = e.target.value;
    const newValue = 
      value.substring(0, cursorPos) + 
      cleanedText + 
      value.substring(e.target.selectionEnd);
      
    // Update the textarea value
    // If using controlled input:
    // Or for uncontrolled:
    e.target.value = newValue;
    handleChange(e)
  };

  const coverPhotoPreview =
    formData.coverPhoto instanceof File
      ? URL.createObjectURL(formData.coverPhoto)
      : formData.coverPhoto ? getImageUrl(formData.coverPhoto) : '';
  const profilePhotoPreview =
    formData.profilePhoto instanceof File
      ? URL.createObjectURL(formData.profilePhoto)
      : formData.profilePhoto ? getImageUrl(formData.profilePhoto) : '';

  return (
    <div className="relative">
      <div
        className="h-48 bg-cover bg-center relative rounded-ss-lg rounded-se-lg"
        style={{
          background: `url(${coverPhotoPreview || defaultCoverPhoto})`,
          boxShadow: "inset 0 0 0 2000px rgba(39, 126, 245, 0.7)",
        }}
      >
        <label className="absolute bottom-4 right-4 flex items-center bg-blue-700 text-white px-3 py-2 rounded cursor-pointer">
          <FaCamera className="mr-2" />
          <input
            type="file"
            name="coverPhoto"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          {/* {formData.profile_photo_url} */}
          Update Cover Photos
        </label>
      </div>
      <div className="absolute top-24 left-6 transform translate-y-1/2">
        <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
          <label className="relative w-full h-full cursor-pointer">
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              ref={fileInputRef}
            />
            <img
              src={profilePhotoPreview ? profilePhotoPreview : defaultProfilePhoto}
              alt="Profile"
              className="w-full h-auto"
            />
          </label>
          <Button
              variant="outline"
              onClick={handleButtonClick}
              className="absolute bottom-0 w-8 h-8 right-0 bg-blue-600 text-white rounded-full z-40 p-1 flex items-center justify-center"
            >
              <FaCamera className="w-4 h-4" />
            </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-20 p-2">
        {message.text && (
          <p
            className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
          >
            {message.text}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm"
            required
          />
        </div>
        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            disabled
          />
        </div>
        {/* Role in Company */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Role in Company
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Yourself
          </label>
          <textarea
            onPaste={handlePaste}
            name="aboutYourself"
            value={formData.aboutYourself}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
