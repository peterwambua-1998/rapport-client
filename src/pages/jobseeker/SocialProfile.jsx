import React, { useState, useEffect } from "react";
import {
  getProfile
} from "@/services/api/api";
const SocialProfile = () => {

  const [formData, setFormData] = useState({
    linkedin: "",
  });
  const [isConnected, setIsConnected] = useState(false); // State to track connection status
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const seeker = response.data;
        const email = seeker?.linkedProfile?.email;
        email ? setIsConnected(true) : ''; // Mark as connected
        setFormData({
          linkedin: email,
        });
      } catch (error) {
        setMessage({ type: "error", text: "Failed to load profile." });
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/;
    if (!urlPattern.test(formData.linkedin)) {
      setMessage("Please enter a valid LinkedIn profile URL.");
      return;
    }
    setIsConnected(true); // Mark as connected
    setMessage("");
    console.log("Social profile connected", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Social Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            disabled={isConnected} // Disable input if already connected
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${isConnected
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
          />
        </div>
        {!isConnected ? (
          <button
            type="submit"
            disabled={!formData.linkedin}
            className={`w-full py-2 rounded-md text-white ${formData.linkedin
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Connect
          </button>
        ) : (
          <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-9a1 1 0 00-1.707-.707l-3 3a1 1 0 001.414 1.414L8 10.414l4.293 4.293a1 1 0 001.414-1.414l-5-5z"
                clipRule="evenodd"
              />
            </svg>
            Connected
          </span>
        )}
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${message.includes("valid") ? "text-red-500" : "text-green-500"
            }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SocialProfile;
