import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaVideo, FaRobot, FaCheckCircle } from "react-icons/fa";
import videoCreationImage from "../../assets/man-shooting-video.png";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import logo from '@/assets/images/RAPPORT.png'

const JobSeekersPage = () => {
  return (
    // min-h-screen bg-gray-100 flex items-center justify-center border-l border-r shadow
    <div className="min-h-screen bg-gray-100 flex items-center justify-center border-l border-r shadow">
      <div className="bg-blue-100/15 ">
        <header className="flex justify-between bg-white items-center h-14 px-6 py-2 border-b shadow-md">
          <Link to="/" className="h-8 w-auto flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="h-full w-full object-contain"
            />
          </Link>
          <div className="flex space-x-4">
            <Link to="/jobseeker/login">
              <Button variant="default" className="text-sm font-semibold bg-blue-400 hover:bg-blue-700">
                Sign In
              </Button>
            </Link>
          </div>
        </header>
        <div className="p-6">
          <section className="text-center mb-12">
            <h2 className="lg:text-5xl md:text-4xl text-xl lg:max-w-6xl md:max-w-lg max-w-xs mx-auto font-extrabold text-gray-900 mb-4">
              Elevate Your Career with Video Profiles
            </h2>
            <p className="lg:max-w-3xl md:max-w-lg max-w-xs text-sm text-gray-600 mb-6 mx-auto">
              Stand out to employers with AI-powered video introductions and verified credentials.
            </p>
            <Link to="/jobseeker/register">
              <button className="bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Create Your Profile
              </button>
            </Link>
          </section>

          <section className="bg-white p-6 w-full rounded-lg shadow-lg mb-12 text-center">
            <h3 className="lg:text-2xl md:text-xl text-lg font-extrabold text-gray-900 mb-6 text-center">
              Why Job Seekers Choose Us
            </h3>

            <div className="flex mb-4 max-w-3xl mx-auto flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="p-6 text-center w-full text-white md:w-auto flex rounded-lg bg-blue-400 flex-col items-center">
                <FaLinkedin className="text-4xl  mb-4" />
                <h4 className="text-xl font-bold mb-2">
                  LinkedIn Integration
                </h4>
                <p>
                  Import your professional history and keep it synced
                  automatically.
                </p>
              </div>
              <div className="p-6 text-center text-white w-full md:w-auto flex flex-col rounded-lg bg-blue-400 items-center">
                <FaVideo className="text-4xl  mb-4" />
                <h4 className="text-xl font-bold mb-2">Video Profiles</h4>
                <p className="">
                  Create engaging 5-minute video introductions to showcase your
                  personality.
                </p>
              </div>
              <div className="p-6 text-center text-white w-full md:w-auto flex flex-col items-center rounded-lg bg-blue-400">
                <FaRobot className="text-4xl mb-4" />
                <h4 className="text-xl font-bold mb-2">AI Analysis</h4>
                <p>
                  Let our AI identify and tag your key skills from your video
                  content.
                </p>
              </div>
            </div>

          </section>

          <section className="p-6 flex flex-col lg:flex-row items-center">
            <div className="mb-8 lg:mb-0 lg:mr-8 w-full lg:w-1/2">
              <img
                src={videoCreationImage}
                alt="Video Creation"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl font-bold mb-4">
                Get Noticed by Top Employers
              </h3>
              <p className="text-gray-600 mb-4">
                Our platform helps you stand out in the job market by showcasing
                your authentic self through video profiles and AI-powered skill
                matching.
              </p>
              <ul className="list-disc list-inside text-left mb-4">
                <li className="flex items-center gap-2 mb-2 text-gray-700">
                  <FaCheckCircle className="text-blue-400 w-5 h-5" />
                  Create compelling video introductions</li>
                <li className="flex items-center mb-2 gap-2 text-gray-700"><FaCheckCircle className="text-blue-400 w-5 h-5" />Get verified as a US-based professional</li>
                <li className="flex items-center mb-2 gap-2 text-gray-700"><FaCheckCircle className="text-blue-400 w-5 h-5" />Connect directly with hiring managers</li>
                <li className="flex items-center mb-2 gap-2 text-gray-700"><FaCheckCircle className="text-blue-400 w-5 h-5" />Let AI match you with perfect opportunities</li>
              </ul>
              <Link to="/jobseeker/register">
                <button className="bg-[#4a90e2] text-white py-2 px-4 rounded-lg hover:bg-[#4a90e2]">
                  Join Now
                </button>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default JobSeekersPage;