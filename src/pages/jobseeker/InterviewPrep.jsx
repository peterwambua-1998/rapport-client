import React from "react";
import {
  FaRegCheckCircle,
  FaRegClock,
  FaClipboardList,
  FaUser,
  FaSyncAlt,
  FaVideo,
  FaArrowLeft,
  FaClipboardCheck,
  FaCheckCircle,
  FaClock,
  FaHourglassEnd,
  FaUserCheck,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";

const InterviewPrep = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-2 mt-2">
        Interview Preparation Guide
      </h1>
      <div className=" mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden p-8">
        {/* Video Interview Tips Card */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaVideo className="text-gray-800 mr-2" />
            Video Interview Tips
          </h2>
          <div className="text-gray-600">
            <div className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" /> Find a quiet,
              well-lit room
            </div>
            <div className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" /> Position
              yourself against a clean background
            </div>
            <div className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" /> Dress
              professionally from head to toe
            </div>
            <div className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" /> Test your camera
              and microphone beforehand
            </div>
            <div className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" /> Look directly
              into the camera when speaking
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" /> Keep good
              posture throughout the interview
            </div>
          </div>
        </section>

        {/* Interview Requirements Card */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCircleInfo className="text-gray-800 mr-2" />
            Interview Requirements
          </h2>
          <div className="text-gray-600">
            <div className="flex items-center mb-2">
              <FaClock className="text-blue-500 mr-2" /> Each answer should be
              1-2 minutes long
            </div>
            <div className="flex items-center mb-2">
              <FaHourglassEnd className="text-blue-500 mr-2" /> Total interview
              time should not exceed 7 minutes
            </div>
            <div className="flex items-center text-red-600 mb-2">
              <IoIosWarning dList className=" mr-2" /> You must select and save
              a set of questions before proceeding
            </div>
            <div className="flex items-center">
              <FaUserCheck className="text-blue-500 mr-2" /> Questions are
              tailored to your profile information
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center">
            <FaSyncAlt className="mr-2" />
            Generate Interview Questions
          </button>
          <div className="flex justify-between w-full">
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center text-center w-1/2 mr-2">
              <FaArrowLeft className="mr-2" />
              Not Ready
            </button>
            <button
              className="bg-gray-400 text-white py-2 px-4 rounded-lg flex items-center justify-center text-center w-1/2 ml-2"
              onClick={() => navigate("/jobseeker/questions")}
            >
              <FaVideo className="mr-2" />
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
