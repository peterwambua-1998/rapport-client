'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit, Star,
  Users, MessageCircle, CheckCircle,
  Calendar,
  Search,
  CirclePlay,
  Lightbulb,
  BadgeCheck,
  CirclePlus,
  ArrowRight,
  Link
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import profileImage from "@/assets/profile.png";
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { getProfile, getSeekerProfile } from '@/services/api/api';
import { formatDateTime, formatUrl, getImageUrl } from '@/services/helpers/helpers';
import videoImg from '@/assets/office-background-image.jpg'
import { IoIosRocket, IoLogoLinkedin } from 'react-icons/io';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaAward, FaGithub, FaLightbulb, FaLinkedin } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa6';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import interviewOne from "@/assets/video-1.jpg"
import interviewTwo from "@/assets/video-2.jpg"
import interviewThree from "@/assets/video-3.jpg"
import { format, parseISO } from 'date-fns';
import { RiPagesFill } from 'react-icons/ri';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';


const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getSeekerProfile();
      const seeker = response.data;
      setProfile(seeker.profileInfo);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FadeLoader loading={loading} size={15} />
      </div>
    )
  }

  const analysis = typeof (profile.videoAnalysis) == "string" ? JSON.parse(profile.videoAnalysis) : profile.videoAnalysis;

  const profileData = {
    name: profile.name,
    about: profile.AboutMe,
    isVerified: true,
    avatar: profile.profilePhotoUrl,
    profileViews: profile.stats.profileViews,
    searchAppearance: profile.stats.searchAppearance,
    interviewsCompleted: profile.stats.interviewsCompleted,
    challengesCompleted: profile.stats.challengesCompleted,
    daysOnPlatform: profile.stats.daysOnPlatform,
    skills: profile.Skills.map(skill => (
      {
        name: skill.name, proficiency: skill.proficiency, challenges: 8, lastUpdated: formatDateTime(skill.updatedAt)
      }
    )),
    softSkills: analysis.softSkills.map(skill => (
      {
        name: skill.name,
      }
    )),
    color: "#4A90E2",
    videoUrl: getImageUrl(profile.videoUrl),
    completedChallenges: 7,
    videoUploadDate: new Date(profile.videoUploadDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    videoLastViewed: "2024-03-20",
    daysSinceUpload: 95,
    isActive: true,
    isPublic: true,
    aiSummary: analysis.summary,
    aiHighlights: analysis.highlights,
    aiRecommendations: analysis.recommendations,
    registrationData: {
      location: profile.Location,
      industry: profile.Industry,
      yearsExperience: profile.YearsofExperience,
      currentRole: profile.CurrentRole,
      company: profile.Company,
      linkedIn: profile.LinkedInProfileUrl ? profile.LinkedInProfileUrl : 'Not defined',
      website: profile.PortfolioUrl ? profile.PortfolioUrl : 'Not defined',
      github: profile.GithubUrl ? profile.GithubUrl : 'Not defined',
    },
    videoTestimonials: [],
    education: profile.Education,
    experience: profile.WorkExperience,
    certifications: profile.Certifications.forEach(cert => {
      return {
        name: cert.name,
        issuer: cert.organization,
      }
    }),
    careerGoals: analysis.careerGoals,
    links: {
      linkedIn: profile.LinkedInProfileUrl ? profile.LinkedInProfileUrl : null,
      website: profile.PortfolioUrl ? profile.PortfolioUrl : null,
      github: profile.GithubUrl ? profile.GithubUrl : null,
    },
    upComingInterviews: []
  };

  const getProficiencyColor = (proficiency) => {
    const colors = {
      beginner: "bg-yellow-100 text-yellow-800",
      intermediate: "bg-blue-100 text-blue-800",
      advanced: "bg-green-100 text-green-800",
      expert: "bg-purple-100 text-purple-800",
      error: 'bg-red-100 text-red-800'
    };
    if (!proficiency) {
      return colors.error
    }
    return colors[proficiency] || colors.intermediate;
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2b4033]">Profile</h1>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className={`${profileData.isActive
                  ? "bg-[#22C55E] text-white border border-[#166534]"
                  : "bg-red-100 text-red-800"
                  }`}
              >
                {profileData.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge
                variant="secondary"
                className={`${profileData.isPublic
                  ? "bg-[#E0E2E5] text-black border border-[#606062]"
                  : "bg-gray-100 text-gray-800 border border-[#606062]"
                  }`}
              >
                {profileData.isPublic ? "Public" : "Private"}
              </Badge>
            </div>
          </div>

          {/* Video Section */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 sm:gap-6">
            <Card className="border border-slate-500 md:col-span-2">
              <CardHeader className="p-3 sm:p-4">
                <h2 className="text-base font-semibold text-[#2b4033]">
                  Platform Activity
                </h2>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 pb-4 text-sm">
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { label: "Profile Views", value: profileData.profileViews },
                    { label: "Search Appearance", value: profileData.searchAppearance },
                    { label: "Interviews Completed", value: profileData.interviewsCompleted },
                    { label: "Challenges Completed", value: profileData.challengesCompleted },
                    { label: "Days On The Platform", value: profileData.daysOnPlatform }
                  ].map((item, index) => (
                    <div key={index} className="border border-slate-300 px-3 sm:px-4 py-2 rounded bg-[#acc8ac]">
                      <p>
                        <span className="text-base sm:text-lg font-semibold">
                          {item.value}{" "}
                        </span>{" "}
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Player */}
            <div className="md:col-span-5">
              <div>
                <div
                  className="relative h-[30vh] sm:h-[40vh] md:h-[57vh] rounded-t-lg bg-gray-200"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url("${videoImg}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <Dialog>
                    <DialogTrigger>
                      <CirclePlay className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 text-[#F1F6FF]" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw]">
                      <DialogHeader>
                        <DialogTitle className="text-[#2b4033]">Video</DialogTitle>
                        <div>
                          <video
                            className="w-full h-full object-cover"
                            controls
                            src={profileData.videoUrl}
                          />
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="p-3 sm:p-4 bg-black/50 rounded-b-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-white gap-2">
                    <span>Uploaded: {profileData.videoUploadDate}</span>
                    <span>Last viewed: {profileData.videoLastViewed}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-[#EAB308] text-xs sm:text-sm flex items-center">
                      ⚠️ Consider updating your video to keep your profile current
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">About Me</h2>
              <p className="text-gray-700 text-sm sm:text-base">{profileData.about}</p>
            </CardContent>
          </Card>

          {/* AI Summary and Professional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* AI Summary Card */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">AI Summary</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm sm:text-base">{profileData.aiSummary}</p>

                  <div className="space-y-2">
                    <h3 className="font-medium text-[#2b4033] text-sm sm:text-base">AI Highlights: These are your best features</h3>
                    {profileData.aiHighlights.map((highlight, index) => (
                      <div className="flex items-start space-x-2" key={index}>
                        <Star
                          fill="#3B82F6"
                          size={16}
                          className="text-blue-500 mt-1"
                        />
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-[#2b4033] text-sm sm:text-base">AI Recommendations: These are areas for improvement</h3>
                    {profileData.aiRecommendations.map((recommendation, index) => (
                      <div className="flex items-start space-x-2" key={index}>
                        <FaLightbulb className="text-yellow-500 mt-1 w-4 h-4" />
                        <span className="text-gray-700 text-sm">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Info Card */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Professional Info</h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { label: "Location", value: profileData.registrationData.location },
                    { label: "Industry", value: profileData.registrationData.industry },
                    { label: "Years of Experience", value: profileData.registrationData.yearsExperience },
                    { label: "Current Role", value: profileData.registrationData.currentRole },
                    { label: "Company", value: profileData.registrationData.company }
                  ].map((item, index) => (
                    <div key={index}>
                      <h3 className="text-xs sm:text-sm text-gray-700">{item.label}</h3>
                      <p className="font-medium text-sm sm:text-base">{item.value}</p>
                    </div>
                  ))}

                  
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Section */}
          <Tabs
            defaultValue="soft"
            className="w-full bg-[#c3dac4] border border-slate-300 p-4 sm:p-6 rounded-lg"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              <TabsTrigger value="technical">Technical Skills</TabsTrigger>
            </TabsList>

            {/* Soft Skills Content */}
            <TabsContent value="soft" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {profileData.softSkills.map((skill, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm sm:text-base">
                        <div className="flex items-center space-x-2">
                          <FaAward className="w-3.5 h-3.5 text-gray-500" />
                          <span>{skill.name}</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Technical Skills Content */}
            <TabsContent value="technical" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {profileData.skills.map((skill, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm sm:text-base">
                        <div className="flex items-center space-x-2">
                          <FaAward className="w-3.5 h-3.5 text-gray-500" />
                          <span>{skill.name}</span>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        <Badge
                          variant="secondary"
                          className={getProficiencyColor(skill.proficiency)}
                        >
                          {!skill.proficiency ? "Add proficiency" : skill.proficiency}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Experience Section */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Experience</h2>
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div className="border-l-4 border-[#94a49c] pl-4" key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">{exp.position}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {exp.employer} · {format(exp.startDate, "MMM yyyy")} -{" "}
                          {exp.currentlyWorking ? "Present" : format(exp.endDate, "MMM yyyy")}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm mt-2 text-gray-800">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Education</h2>
              <div className="space-y-3 sm:space-y-4">
                {profileData.education.map((education, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-sm sm:text-base">
                      {education.degree} - {education.major}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {education.school} · {format(new Date(education.startDate), "MMM yyyy")} -{" "}
                      {format(new Date(education.endDate), "MMM yyyy")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Goals Section */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Career Goals</h2>
              <div className="space-y-2 sm:space-y-3">
                {profileData.careerGoals.map((goal, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <span className="text-sm sm:text-base text-gray-700">{goal.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Testimonials Section */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg font-semibold text-[#2b4033]">Video Testimonials</h2>
                <Button
                  className="bg-transparent border-none hover:bg-transparent text-[#2b4033] hover:text-[#1e3728]"
                  size="sm"
                >
                  <CirclePlus strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" /> Request new
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {profileData.videoTestimonials.map((testimonial, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative h-32 sm:h-40 bg-gray-200 rounded-lg">
                      <img
                        src={testimonial.thumbnail}
                        alt="Testimonial"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Dialog>
                        <DialogTrigger>
                          <CirclePlay className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 text-[#F1F6FF]" />
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw]">
                          <DialogHeader>
                            <DialogTitle className="text-[#2b4033]">Video</DialogTitle>
                            <div>
                              <video
                                className="w-full h-full object-cover"
                                controls
                                src={testimonial.videoUrl}
                              />
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${testimonial.status === "Approved"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                          } text-white`}
                      >
                        {testimonial.status}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base text-[#2b4033]">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700">{testimonial.position}</p>
                      <p className="text-xs text-gray-500">Recorded {testimonial.recordedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Profile Card */}
          <Card className="bg-[#c3dac4] border border-slate-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col items-center">
                <img
                  src={getImageUrl(profileData.avatar)}
                  alt="Profile"
                  className="rounded-lg mb-3 sm:mb-4 w-32 sm:w-40"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-[#2b4033]">
                  {profileData.name}
                </h2>
                {profileData.isVerified && (
                  <div className="flex items-center space-x-1 mt-1">
                    <BadgeCheck strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-600">Verified profile</span>
                  </div>
                )}
                <div className="w-full mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  <Button
                    onClick={() => navigate("/jobseeker/profile")}
                    className="bg-[#dce2d4] hover:bg-[#c2c8bb] text-black w-full text-sm sm:text-base"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit profile
                  </Button>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base">
                    <IoIosRocket className="mr-2" />
                    Promote profile
                  </Button>
                  <Button className="w-full bg-[#2b4033] hover:bg-[#1e3728] text-sm sm:text-base">
                    <FaVideo className="mr-2" /> Get Interview Coaching
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links Section */}
          <Card className="border border-slate-500">
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-lg font-semibold text-[#2b4033]">Links</h2>
                <Link size={14} className="mt-[-2px]" strokeWidth={3} />
              </div>
              {[
                { type: 'website', icon: RiPagesFill, label: 'Portfolio' },
                { type: 'linkedIn', icon: FaLinkedin, label: 'LinkedIn' },
                { type: 'github', icon: FaGithub, label: 'Github' }
              ].map((link) => (
                profileData.links[link.type] && (
                  <a
                    key={link.type}
                    href={formatUrl(profileData.links[link.type])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border px-2 py-2 rounded bg-[#c3dac4] hover:bg-[#b2c9b3] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <link.icon className="text-gray-800 w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="font-medium text-sm sm:text-base text-gray-800">{link.label}</p>
                    </div>
                    <MdKeyboardDoubleArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                )
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Interviews Section */}
          <Card className="border border-slate-500">
            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-[#2b4033]">Upcoming Interviews</h2>
              <Button variant="link" className="text-xs sm:text-sm text-[#2b4033]">
                <ArrowRight className="w-4 h-4" /> View all
              </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
              {profileData.upComingInterviews.length === 0 ? (
                <div className="border px-2 py-2 rounded bg-[#c3dac4]">
                  <p className="text-sm sm:text-base text-gray-800">
                    You do not have any upcoming interviews yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {profileData.upComingInterviews.map((interview, index) => (
                    <div key={index} className="border px-2 py-2 rounded bg-[#c3dac4]">
                      <h3 className="font-medium text-sm sm:text-base">{interview.position}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{interview.company}</p>
                      <div className="flex items-center space-x-2 mt-1 text-xs sm:text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{interview.date} at {interview.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;