import React, { useEffect, useState } from "react";

import { FaCheckCircle, FaStar } from "react-icons/fa";
import { getProfile } from "../../services/api/api";
import { getImageUrl } from "../../services/helpers/helpers";
import { MdVerified, MdLocationOn } from "react-icons/md";
import { GiSuitcase } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { VscUnverified } from "react-icons/vsc";
import backgroundImage from '@/assets/images/placeholder-cover.png';
import profilePic from '@/assets/images/dummyImg.png';
import { useUserProfile } from "@/context/userProfilePhoto";


const Dashboard = () => {
  const [userProfile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { photo } = useUserProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        
      } catch (err) {
        setError("Error fetching recruiter profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FadeLoader />
        <p>Loading...</p>
      </div>
    )
  }
  if (error) return <p>{error}</p>;
  if (!userProfile) return <p>No profile data available.</p>;

  const { name, email, recruiterProfile, avatar, cover_photo, } = userProfile;
  const {
    Company = [],
    company_name = "N/A",
    country = "N/A",
    years_of_experience = "N/A",
    specialization = "N/A",
    successful_placements = "N/A",
    platform_tenure = "N/A",
    response_rate = "N/A",
    about = "N/A",
    role = ""
  } = recruiterProfile || {};

  let company = company_name;
  let is_verified = false;
  let company_true = false;

  if (Company?.name) {
    is_verified = Company.is_verified;
    company = Company.name;
    company_true = true;
  }

  const coverPhoto = cover_photo
    ? getImageUrl(cover_photo)
    : backgroundImage;
  const profilePhoto = avatar
    ? getImageUrl(avatar)
    : profilePic;

  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div
          className="relative bg-blue-500 h-48"
          style={{
            background: `url(${coverPhoto})`,
            boxShadow: "inset 0 0 0 2000px rgba(39, 126, 245, 0.7)",
          }}
        >
          <div className="absolute -bottom-12 left-6">
            <img
              src={photo}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-14 px-6 ">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <div className="flex items-center space-x-4">
              {/* <h1 className="text-2xl font-bold text-gray-800">{company}</h1> */}
              {company_true &&
                is_verified ? (
                <div className="flex items-center bg-blue-100 p-1 rounded-full space-x-2">
                  <MdVerified className="text-blue-600 text-xl w-4 h-4" />
                  <span className="text-xs text-blue-600 font-bold">Verified Company</span>
                </div>
              ) : (
                <div className="flex items-center bg-gray-200 p-1 rounded-full space-x-2">
                  {/* <VscUnverified className="text-gray-500 text-xl w-4 h-4" /> */}
                  <VscUnverified className="text-gray-600 text-xl" />
                  <span className="text-xs text-gray-600 font-bold">Unverified Company</span>
                </div>
              )
              }
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {role} at {company}
          </p>
          <div className="flex items-center text-gray-500 mt-6">
            <MdLocationOn />
            <p className="ml-1 text-sm">{country}</p>
          </div>
        </div>

        {/* Experience and Stats */}
        <div className="mt-6 px-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-black font-bold">Experience</h2>
            <div className="flex gap-4 mt-2">
              <div>
                <GiSuitcase className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-black font-semibold">
                  {years_of_experience} years in Technical Recruiting
                </p>
                <p className="text-sm text-gray-600">
                  Specialized in {specialization} roles
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div>
                <IoIosPeople className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-black font-semibold">
                  {successful_placements} Successful Placements
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Focus on {specialization} positions
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-black font-bold">Platform Stats</h2>
            <div className="flex gap-4 mt-4">
              <div>
                <FaClock className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-black font-semibold">
                  Time on Platform
                </p>
                <p className="mt-1 text-sm text-gray-600">{platform_tenure}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div>
                <FaStar className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-black font-semibold">
                  Response rate
                </p>
                <p className="mt-1 text-sm text-gray-600">{response_rate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 px-6 pb-6">
          <h2 className="text-gray-700 font-semibold">About</h2>
          <p className="mt-2 text-sm text-gray-600">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
