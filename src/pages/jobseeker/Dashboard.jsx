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
import RequestTestimonial from './components/RequestTestimonalModal';


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
    name: profile.Name,
    title: profile.ProfessionalTitle,
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
    // profile.preference.activeStatus
    isActive: profile.preference.activeStatus,
    isPublic: profile.preference.profileVisible,
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
    videoTestimonials: profile.testimonials,
    education: profile.Education,
    experience: profile.WorkExperience,
    certifications: profile.Certifications.map((cert) => ({ name: cert.name, issuer: cert.organization })),
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
                className={`${profileData.isPublic
                  ? "bg-[#E0E2E5] text-black border border-[#606062]"
                  : "bg-yellow-100 text-yellow-800 border border-yellow-800"
                  }`}
              >
                {profileData.isPublic ? "Public" : "Private"}
              </Badge>
              <Badge
                variant="secondary"
                className={`${profileData.isActive
                  ? "bg-green-100 text-green-800 border border-[#166534]"
                  : "bg-red-100 text-red-800 border border-red-800"
                  }`}
              >
                {profileData.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          {/* Video Section */}
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 sm:gap-6">
            <Card className="border border-slate-400/80 md:col-span-2">
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
                    { label: "Days On Platform", value: profileData.daysOnPlatform }
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-400 px-3 sm:px-4 py-2 rounded bg-[#acc8ac]">
                      <p>
                        <span className="text-sm md:text-sm font-semibold">
                          {item.value}{" "}
                        </span>{" "}
                        <span className='text-xs'>{item.label}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Player */}
            <div className="md:col-span-6">
              <div>
                <div
                  className="relative h-[30vh] md:h-[53vh] rounded-t-lg bg-gray-200"
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
            <CardContent className="p-4 md:p-4">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">About Me</h2>
              <p className="text-gray-700 text-sm sm:text-base">{profileData.about}</p>
            </CardContent>
          </Card>

          {/* AI Summary and Professional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* AI Summary Card */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-4 md:p-4">
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
              <CardContent className="p-4 md:p-4">
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
            className="w-full bg-[#c3dac4] border border-slate-300 p-4 md:p-4 rounded-lg"
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
            <CardContent className="p-4 md:p-4">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Experience</h2>
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div className="border-l-4 border-[#94a49c] pl-4" key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">{exp.position}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {exp.employer} · {exp.startDate} -{" "}
                          {exp.currentlyWorking ? "Present" : exp.endDate}
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
            <CardContent className="p-4 md:p-4">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Education</h2>
              <div className="space-y-3 sm:space-y-4">
                {profileData.education.map((education, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-sm sm:text-base">
                      {education.degree} - {education.major}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {education.school} · {education.startDate} -{" "}
                      {education.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications Section */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 md:p-4">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.certifications.map((cert, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-sm text-gray-500">{cert.issuer}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Goals Section */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 md:p-4">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-[#2b4033]">Career Goals</h2>
              {profileData.careerGoals.length == 0 ?
                <div>
                  <p className='text-black/50 text-xs md:text-sm'>You do not have any testimonials currently.</p>
                </div>
                :
                <div className="space-y-2 sm:space-y-3">
                  {profileData.careerGoals.map((goal, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      <span className="text-sm sm:text-base text-gray-700">{goal.name}</span>
                    </div>
                  ))}
                </div>}
            </CardContent>
          </Card>

          {/* Video Testimonials Section */}
          <Card className="bg-[#c3dac4] border border-slate-300">
            <CardContent className="p-4 md:p-4">
              <div className="md:flex md:items-center md:justify-between mb-4 sm:mb-6">
                <h2 className="text-lg font-semibold md:mb-3 mb-1 text-[#2b4033]">Video Testimonials</h2>
                <RequestTestimonial />
              </div>
              {profileData.videoTestimonials.length == 0 &&
                <div className='mt-[-20px]'>
                  <p className='text-black/50 text-xs md:text-sm'>You do not have any testimonials currently.</p>
                </div>
              }
              {profileData.videoTestimonials.length > 0 &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {profileData.videoTestimonials.map((testimonial, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative h-32 sm:h-40 bg-gray-200 rounded-lg">
                        <video
                          className="w-full h-full object-cover rounded"
                          controls
                          src={getImageUrl(testimonial.video)}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base text-[#2b4033]">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-500">Recorded {testimonial.createdAt}</p>
                      </div>
                    </div>
                  ))}

                </div>
              }

            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Profile Card */}
          <Card className="bg-[#c3dac4] border border-slate-400/80">
            <CardContent className="p-4 md:p-4">
              <div className="flex flex-col items-center">
                <img
                  src={getImageUrl(profileData.avatar)}
                  alt="Profile"
                  className="rounded-lg mb-3 sm:mb-4 w-40 md:w-[20vw] border border-gray-500"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-[#2b4033]">
                  {profileData.name}
                  {profileData.isVerified && (
                    <BadgeCheck strokeWidth={2.5} className="w-4 h-4 inline ml-2 sm:w-5 sm:h-5 text-blue-500" />
                  )}
                </h2>
                <p className='text-gray-700 text-sm'>{profileData.title}</p>

                <div className="w-full mt-4 sm:mt-4 space-y-2 sm:space-y-3">
                  <Button
                    onClick={() => navigate("/jobseeker/profile")}
                    className="bg-[#2b4033] hover:bg-[#1e3728] text-white w-full text-sm sm:text-base"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit profile
                  </Button>
                  {/* <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base">
                    <IoIosRocket className="mr-2" />
                    Promote profile
                  </Button>
                  <Button className="w-full bg-[#2b4033] hover:bg-[#1e3728] text-sm sm:text-base">
                    <FaVideo className="mr-2" /> Get Interview Coaching
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links Section */}
          <Card className=" border border-slate-400/80">
            <CardContent className="p-4 md:p-4 space-y-3 sm:space-y-4">
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
                    className="flex items-center justify-between border border-gray-400 px-2 py-2 rounded bg-[#c3dac4] hover:bg-[#b2c9b3] transition-colors"
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
          <Card className=" border border-slate-400/80">
            <CardHeader className="p-4 md:p-4">
              <h2 className="text-lg font-semibold text-[#2b4033]">Upcoming Interviews</h2>
              <p className="text-xs font-medium sm:text-sm text-[#2b4033]">
                View all <ArrowRight className="w-4 h-4 inline" />
              </p>
            </CardHeader>
            <CardContent className="px-4 pb-4 md:pb-4">
              {profileData.upComingInterviews.length === 0 ? (
                <div className="border border-gray-400 px-4 py-4 rounded bg-[#c3dac4]">
                  <p className="text-black/70 text-xs md:text-sm">
                    You currently do not have any upcoming interviews.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {profileData.upComingInterviews.map((interview, index) => (
                    <div key={index} className="border border-gray-400 px-2 py-2 rounded bg-[#c3dac4]">
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