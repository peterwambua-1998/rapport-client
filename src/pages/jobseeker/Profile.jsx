import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdVerified } from "react-icons/md";
import {
  FaCheckCircle,
  FaLinkedin,
  FaRegCircle,
  FaRobot,
  FaStar,
} from "react-icons/fa";
import { getProfile } from "@/services/api/api";
import { getImageUrl } from "@/services/helpers/helpers";


const JobSeekerProfile = () => {
  const [data, setData] = useState({
    fullName: "", email: "", phone: "", address: "", city: "", state: "",
    zipCode: "", professionalTitle: "", industry: "", educationLevel: "", yearsOfExperience: "", skillLevel: "",
    skills: {}, aboutYourself: "", video: null, profilePicture: null, profileVisible: false,
    activeStatus: false, photo: "", experience: false, education: false, user_skills: false,
    video_introduction: false, basic_information: false, layout_style: "", color: "#f9fafc",
    analysis: '', highlights: [], keywords: [], strengths: [], softSkills: [],
  });


  const [message, setMessage] = useState('');


  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const seeker = response.data;
      const profile = seeker?.JobSeeker;
      const visibilitySetting = seeker?.VisibilitySetting;
      const linkedinProfile = seeker.linkedProfile;
      const videoAnalysis = profile?.videoAnalysis;
      const analysis = typeof(videoAnalysis) == "string" ? JSON.parse(videoAnalysis): videoAnalysis;

      setData({
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
        layout_style: profile?.layoutStyle,
        color: profile?.backgroundColor || "",
        analysis: analysis?.analysis || '',
        highlights: analysis['highlights'] || [],
        keywords: analysis["keywords and expertise"] || [],
        strengths: analysis['strengths'] || [],
        softSkills: analysis["soft skills"] || [],
      });
    } catch (error) {
      console.log(error)
      setMessage({ type: "error", text: "Failed to load profile." });
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);


  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: data.color }}>
      <div className="max-w-5xl mx-auto">
        {/* Header buttons */}
        <div className="flex  gap-2 mb-4 bg-white p-2 rounded-md">
          <h1 className="text-2xl font-semibold">My Profile</h1>
        </div>
        {/* Profile Card */}
        <Card className="mb-6 bg-gray-100">
          <div className="bg-black rounded-t-md" style={{ height: "300px" }}>
            {data.video ? (
              <video
                src={getImageUrl(data.video)}
                controls
                className="w-full h-full object-cover rounded-t-md"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              // Placeholder for when no video is available
              <div className="flex items-center justify-center h-full text-white">
                No Video Available
              </div>
            )}
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-lg font-extrabold text-gray-800">
                  {data.fullName}
                </h2>
                <MdVerified className="w-5 h-5 ml-2 text-blue-500" />
              </div>
              <div>
                <Badge className={`font-bold ${data.activeStatus ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"}`}>
                  {data.activeStatus ? "Active" : "In-Active"}
                </Badge>
                <Badge
                  variant="outline"
                  className={`font-bold ml-2 ${data.profileVisible ? "text-blue-500 bg-blue-100" : "text-gray-500 bg-gray-100"}`}
                >
                  {data.profileVisible ? "Public" : "Private"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="bg-white p-4 border-1 border-gray-200/70 rounded">
              <div className="mb-4 ">
                <h3 className="text-lg font-extrabold text-gray-800 mb-2">
                  AI Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  {data.analysis}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-extrabold text-gray-800 mb-2">
                  AI Highlights
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {data.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center mb-2 gap-2 text-gray-700">
                      <FaStar className="text-yellow-500 w-4 h-4" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 items-center">
                <h3 className="text-lg font-bold text-gray-800">
                  AI Analysis Rating
                </h3>
                <Badge
                  variant="success"
                  className="bg-green-100 text-green-700 font-bold"
                >
                  92% Accuracy
                </Badge>
                <span className="text-sm text-gray-600">(45 reviews)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keywords & Expertise, Soft Skills, and Professional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ">
          {/* Keywords & Expertise */}
          <Card className="bg-gray-100">
            <CardHeader>
              <h3 className="text-lg font-extrabold text-gray-800 flex items-center">
                Keywords & Expertise{" "}
                <FaRobot className="w-3 h-3 text-gray-500 mr-1 inline-flex ml-2" />
                <span className="font-semibold text-gray-500 text-xs">
                  AI-analyzed from video
                </span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-800 font-semibold"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
              <h3 className="text-lg font-extrabold text-gray-800 flex items-center mt-6">
                Strengths{" "}
                <FaRobot className="w-3 h-3 text-gray-500 mr-1 inline-flex ml-2" />
                <span className="font-semibold text-gray-500 text-xs">
                  Based on video analysis
                </span>
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mt-2">
                {data.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center mb-2 gap-2 text-gray-700">
                    <FaCheckCircle className="text-green-400 w-4 h-4" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Soft Skills */}
          <Card className="bg-gray-100">
            <CardHeader>
              <h3 className="text-lg font-extrabold text-gray-800 flex items-center">
                Soft Skills{" "}
                <FaRobot className="w-3 h-3 text-gray-500 mr-1 inline-flex ml-2" />
                <span className="font-semibold text-gray-500 text-xs">
                  Detected in video
                </span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.softSkills.map((skill, index) => (
                  <Badge key={index} className="bg-pink-100 text-pink-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Information */}
        <Card className="mb-6 bg-gray-100">
          <CardHeader>
            <h3 className="text-lg font-extrabold text-gray-800">
              Professional Information
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-y-5 text-sm text-gray-600">
              <div>
                <p className="text-sm font-bold text-gray-500">Location:</p>
                <p className="text-md font-bold text-black">New York, NY</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Current Role:</p>
                <p className="text-md font-bold text-black">
                  Senior Product Manager
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Industry:</p>
                <p className="text-md font-bold text-black">Technology</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Company:</p>
                <p className="text-md font-bold text-black">
                  Tech Innovations Inc
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">
                  Years of Experience:
                </p>
                <p className="text-md font-bold text-black">8</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Education:</p>
                <p className="text-md font-bold text-black">
                  MBA - Business Administration
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">LinkedIn:</p>
                <p className="text-md font-bold text-black">
                  <a
                    href="https://linkedin.com/in/johnsmith"
                    className="text-black"
                  >
                    linkedin.com/in/johnsmith
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Portfolio:</p>
                <p className="text-md font-bold text-black">
                  <a
                    href="https://linkedin.com/in/johnsmith"
                    className="text-black"
                  >
                    johnsmith.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Profile Section */}
        <Card className="mb-6 bg-gray-100">
          <CardHeader>
            <h2 className="text-lg font-extrabold text-gray-800 flex items-center">
              LinkedIn Profile <FaLinkedin className="text-blue-500" />
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div>
                <h3 className="text-md font-bold text-gray-800 mb-2">
                  Experience
                </h3>
                <div className="mb-4 border-l-2 pl-4 border-blue-400">
                  <h4 className="text-sm font-bold text-gray-800">
                    Senior Product Manager
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Tech Innovations Inc • 2021 - Present
                  </p>

                  <p className="text-sm text-gray-600 mb-2">
                    Leading product strategy{" "}
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li className="flex items-center mb-2 gap-2 text-gray-700">
                      <FaCheckCircle className="text-green-400 w-4 h-4" />
                      Launched 3 major product features increasing revenue by
                      40%
                    </li>
                    <li className="flex items-center mb-2 gap-2 text-gray-700">
                      <FaCheckCircle className="text-green-400 w-4 h-4" />
                      Reduced customer churn by 25% through strategic product
                      improvements
                    </li>
                    <li className="flex items-center mb-2 gap-2 text-gray-700">
                      <FaCheckCircle className="text-green-400 w-4 h-4" />
                      Led cross-functional team of 20+ members across 3
                      continents
                    </li>
                  </ul>
                </div>
                <div className="border-l-2 pl-4 border-blue-400">
                  <h4 className="text-sm font-bold text-gray-800">
                    Product Manager
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Digital Solutions Co • 2018 - 2021
                  </p>
                  <p className="text-sm text-gray-600 mb-2">Managed full </p>

                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li className="flex items-center mb-2 gap-2 text-gray-700">
                      <FaCheckCircle className="text-green-400 w-4 h-4" />
                      Grew user base from 10k to 100k in 18 months
                    </li>
                    <li className="flex items-center mb-2 gap-2 text-gray-700">
                      <FaCheckCircle className="text-green-400 w-4 h-4" />
                      Implemented agile methodologies improving delivery time by
                      35%
                    </li>
                    <li className="flex items-center mb-2 gap-2 text-gray-700">
                      <FaCheckCircle className="text-green-400 w-4 h-4" />
                      Secured $2M in additional funding through product success
                    </li>
                  </ul>
                </div>
              </div>

              {/* Education and Certifications */}
              <div>
                <h3 className="text-md font-bold text-gray-800 mb-2">
                  Education
                </h3>
                <ul className="text-sm text-gray-600 space-y-4">
                  <li>
                    <p className="font-bold">MBA - Business Administration</p>
                    <p className="text-xs">Stanford University • 2018</p>
                  </li>
                  <li>
                    <p className="font-bold">BS - Computer Science</p>
                    <p className="text-xs">
                      University of California, Berkeley,2014
                    </p>
                  </li>
                  <li></li>
                </ul>
                <h3 className="text-md font-bold text-gray-800 mt-6 mb-2">
                  Certifications
                </h3>
                <ul className="text-sm text-gray-600 space-y-4">
                  <li>
                    <p className="font-bold">
                      Professional Scrum Master (PSM I)
                    </p>
                    <p className="text-xs">Scrum.org, 2023</p>
                  </li>
                  <li>
                    <p className="font-bold">
                      Product Management Certification
                    </p>
                    <p className="text-xs">Product School, 2022</p>
                  </li>
                </ul>
                <h3 className="text-md font-semibold text-gray-800 mt-6 mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    Product Strategy
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    Agile Methodologies
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    Cross-functional Leadership
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    Data Analytics
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    User Experience (UX)
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    Strategic Planning
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    Team Building
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Goals Section */}
        <Card className="mb-6 bg-gray-100">
          <CardHeader>
            <h2 className="text-lg font-bold text-gray-800">Career Goals</h2>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-4">
              <li className="flex items-center mb-2 gap-2 text-gray-700">
                <FaRegCircle className="text-blue-400 w-4 h-4" />
                Transition to Director of Product role within 2 years
              </li>
              <li className="flex items-center mb-2 gap-2 text-gray-700">
                <FaRegCircle className="text-blue-400 w-4 h-4" />
                Build and scale products that impact millions of users
              </li>
              <li className="flex items-center mb-2 gap-2 text-gray-700">
                <FaRegCircle className="text-blue-400 w-4 h-4" />
                Mentor junior product managers and build strong teams
              </li>
              <li className="flex items-center mb-2 gap-2 text-gray-700">
                <FaRegCircle className="text-blue-400 w-4 h-4" />
                Develop expertise in AI/ML product strategy
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Video Testimonials Section */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Video Testimonials</h3>
            <button className="text-blue-500 font-medium hover:underline">
              Request New Testimonial
            </button>
          </div>
          <div className="flex gap-8">
            {/* Testimonial Card 1 */}
            <div className="flex flex-col w-full">
              <div className="relative">
                <img
                  className="w-full h-40 object-cover rounded-lg"
                  src="https://via.placeholder.com/150"
                  alt="Sarah Chen"
                />
                <div className="absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded bg-green-500 text-white">
                  Approved
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  2:15
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-lg font-semibold">Sarah Chen</h4>
                <p className="text-sm text-gray-600 ">
                  Engineering Director at Tech Solutions Inc
                </p>
                <p className="text-xs text-gray-500">
                  Former Manager • Recorded 2024-02-15
                </p>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="flex flex-col w-full">
              <div className="relative">
                <img
                  className="w-full h-40 object-cover rounded-lg"
                  src="https://via.placeholder.com/150"
                  alt="Michael Rodriguez"
                />
                <div className="absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded bg-green-500 text-white">
                  Approved
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  1:45
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-lg font-semibold">Michael Rodriguez</h4>
                <p className="text-sm text-gray-600">
                  Senior Developer at Tech Innovations Inc
                </p>
                <p className="text-xs text-gray-500">
                  Team Member • Recorded 2024-02-10
                </p>
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="flex flex-col w-full">
              <div className="relative">
                <img
                  className="w-full h-40 object-cover rounded-lg"
                  src="https://via.placeholder.com/150"
                  alt="Emily Watson"
                />
                <div className="absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded bg-yellow-400 text-white">
                  Pending
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  2:30
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-lg font-semibold">Emily Watson</h4>
                <p className="text-sm text-gray-600">
                  Product Owner at Digital Ventures
                </p>
                <p className="text-xs text-gray-500">
                  Project Collaborator • Recorded 2024-02-01
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
