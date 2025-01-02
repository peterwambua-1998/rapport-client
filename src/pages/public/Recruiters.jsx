import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaUsers,
  FaVideo,
  FaChalkboardTeacher,
  FaShareAlt,
  FaQuestionCircle,
  FaLinkedin,
  FaHandshake,
  FaCheck,
} from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaChalkboardUser } from "react-icons/fa6";
import networkIllustration from "../../assets/networkIllustration.jpg";
import { Button } from "@/components/ui/button";
import { linkedInLogin } from "../../services/api/api";
import logo from '@/assets/images/RAPPORT.png'

const Recruiters = () => {
  const handleLinkedInLogin = async () => {
    linkedInLogin("recruiter");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center border-l border-r shadow">
      {/* Card Container */}
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
            <Link to="/recruiter/login">
              <Button
                variant="default"
                className="text-sm font-semibold bg-blue-400 hover:bg-blue-700"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </header>
        <div className="p-6">
          {/* Main Heading and Subheading */}
          <section className="text-center mb-12">
            <h2 className="lg:text-5xl md:text-4xl text-xl lg:max-w-6xl md:max-w-lg max-w-xs mx-auto font-extrabold text-gray-900 mb-4">
              Transform Your Recruitment Process
            </h2>
            <p className="lg:max-w-2xl md:max-w-lg max-w-xs text-lg text-gray-600 mb-6 mx-auto">
              Access verified US talent through AI-powered video profiles and
              revolutionize how you evaluate candidates.
            </p>
            <Link to="/recruiter/register">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Start Hiring
              </button>
            </Link>
          </section>

          {/* Three Key Benefits Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MdAccessTimeFilled className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">60% Faster Hiring</h3>
              <p className="text-gray-600">
                Reduce time-to-hire dramatically with pre-recorded video
                introductions and AI-powered candidate matching.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaCheckCircle className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Talent</h3>
              <p className="text-gray-600">
                Access only verified US-based professionals, eliminating
                uncertainty in your hiring process.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaVideo className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Virtual Interviews</h3>
              <p className="text-gray-600">
                Conduct seamless virtual interviews and assess soft skills
                through our integrated platform.
              </p>
            </div>
          </section>

          {/* AI-Powered Talent Search Section */}
          <section className="mb-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h3 className="lg:text-2xl md:text-xl text-lg font-extrabold text-gray-900 mb-4">
                AI-Powered Talent Search
              </h3>
              <p className="text-gray-600 lg:text-xl md:text-base text-sm mb-6 lg:max-w-[96%] md:max-w-lg max-w-xs">
                Our advanced AI technology analyzes video profiles to match
                candidates based on both technical skills and cultural fit.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li className="flex items-center gap-2 mb-2">
                  <FaCheck className="text-blue-500 w-4 h-4" />
                  95% matching accuracy for technical skills
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <FaCheck className="text-blue-500 w-4 h-4" />
                  Personality and soft skills assessment
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <FaCheck className="text-blue-500 w-4 h-4" />
                  Advanced filtering and search capabilities
                </li>
              </ul>
            </div>
            <div
              className="w-full md:w-1/2 h-[70vh] rounded-md"
              style={{
                backgroundImage: `url(${networkIllustration})`,
                backgroundSize: "cover",
                boxShadow: "inset 0 0 0 2000px rgba(39, 126, 245, 0.2)",
              }}
            >
              {/* <img
                src={networkIllustration}
                alt="Talent Search"
                className="w-full h-auto rounded-lg"
              /> */}
            </div>
          </section>

          {/* Virtual Collaboration Features */}
          <section className="mb-12 bg-white shadow-lg rounded-md">
            <h3 className="lg:text-2xl md:text-xl text-lg font-extrabold text-gray-900 mb-4 text-center pt-6">
              Virtual Collaboration Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg ">
                <div className="flex items-center mb-2">
                  <FaVideo className="text-4xl text-blue-500 mr-4" />
                  <h4 className="text-xl font-bold">Virtual Interviews</h4>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-blue-500 w-4 h-4" />
                    HD video calls with screen sharing
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-blue-500 w-4 h-4" />
                    Built-in technical assessment tools
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-blue-500 w-4 h-4" />
                    Interview recording capabilities
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg ">
                <div className="flex items-center mb-2">
                  <FaUsers className="text-4xl text-blue-500 mr-4" />
                  <h4 className="text-xl font-bold">Team Collaboration</h4>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-blue-500 w-4 h-4" />
                    Shared candidate notes and ratings
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-blue-500 w-4 h-4" />
                    Team scheduling coordination
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-blue-500 w-4 h-4" />
                    Collaborative hiring decisions
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Join Our Recruiter Network */}
          <section className="bg-white p-6 rounded-lg shadow-lg mb-12 text-center">
            <h3 className="lg:text-2xl md:text-xl text-lg font-extrabold text-gray-900 mb-4 text-center">
              Join Our Recruiter Network
            </h3>
            <p className="text-gray-600 mb-8">
              Help shape the future of talent by joining our network of expert
              recruiters.
            </p>
            <div className="flex max-w-3xl mx-auto flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="p-6 bg-gray-100 rounded-lg text-center w-full md:w-auto flex flex-col items-center">
                <FaChalkboardUser className="text-4xl text-blue-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Train Job Seekers</h4>
                <p className="text-gray-600">
                  Conduct mock interviews and provide feedback
                </p>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg text-center w-full md:w-auto flex flex-col items-center">
                <FaShareAlt className="text-4xl text-blue-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Share Expertise</h4>
                <p className="text-gray-600">
                  Create content and skill-building resources
                </p>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg text-center w-full md:w-auto flex flex-col items-center">
                <FaQuestionCircle className="text-4xl text-blue-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Submit Questions</h4>
                <p className="text-gray-600">
                  Contribute to the interview question database
                </p>
              </div>
            </div>
            <Link to="/recruiter/register">
              <button className="mt-8 bg-blue-500 flex mx-auto gap-2 font-semibold text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                <FaHandshake className="text-2xl" />{" "}
                <span>Join as a Recruiter</span>
              </button>
            </Link>
          </section>

          {/* Ready to Transform Your Hiring */}
          <section className="bg-blue-500 p-6 rounded-lg shadow-lg text-center text-white">
            <h3 className="lg:text-2xl md:text-xl text-lg font-extrabold mb-6 ">
              Ready to Transform Your Hiring?
            </h3>
            <p className="mb-8 max-w-[40%] mx-auto">
              Join leading companies who are already finding and hiring top
              talent faster with our AI-powered platform
            </p>
            <button
              onClick={handleLinkedInLogin}
              className="flex items-center mx-auto gap-2 bg-white text-blue-500 py-2 px-6 rounded-lg hover:bg-gray-200"
            >
              <FaLinkedin className="text-xl" />
              <span>Sign in with LinkedIn to Start</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Recruiters;
