import React, { useState, useEffect,useRef  } from "react";
import { getProfile, updateAdminProfile } from "../../services/api/api";
import { FaCamera  } from "react-icons/fa";
import { getImageUrl } from "@/services/helpers/helpers";
import { IoPersonSharp } from "react-icons/io5";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";
 
const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePhoto: null,
    photo: "",
  });


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const profile = response.data;
        setFormData({
          name: profile?.name || "",
          email: response?.data.email || "",
          profilePhoto: profile?.avatar || null,
          photo: profile?.avatar || null,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage({ type: "error", text: "Failed to load profile." });
      }
    };

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
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);

    if (formData.profilePhoto) {
      formDataToSubmit.append("profilePhoto", formData.profilePhoto);
    }

    try {
      await updateAdminProfile(formDataToSubmit);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (error) { 
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const profilePhotoPreview =
    formData.profilePhoto instanceof File
      ? URL.createObjectURL(formData.profilePhoto)
      : formData.photo ? getImageUrl(formData.photo) : '';

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
          <div className="col-span-2 flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Update Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 col-span-2">
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
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  ref={fileInputRef}
                />
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
