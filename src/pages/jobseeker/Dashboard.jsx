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
  ArrowRight
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import profileImage from "@/assets/profile.png";
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { getProfile, getSeekerProfile } from '@/services/api/api';
import { formatDateTime, getImageUrl } from '@/services/helpers/helpers';
import videoImg from '@/assets/office-background-image.jpg'
import { IoIosRocket, IoLogoLinkedin } from 'react-icons/io';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaAward, FaLightbulb } from 'react-icons/fa';
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
    profileViews: 12,
    searchAppearance: 8,
    interviewsCompleted: 12,
    challengesCompleted: 3,
    daysOnPlatform: 3,
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
    education: profile.Education.forEach(edu => {
      return {
        "school": edu.school,
        "degree": edu.degree,
        "major": edu.major,
        "startDate": format(edu.startDate, "MMM yyyy"),
        "endDate": format(edu.endDate, "MMM yyyy")
      }
    }),
    experience: profile.WorkExperience,
    certifications: profile.Certifications.forEach(cert => {
      return {
        name: cert.name,
        issuer: cert.organization,
      }
    }),
    careerGoals: analysis.careerGoals,
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="col-span-3 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold text-[#2b4033]">Profile</h1>
              <div className="flex space-x-2">
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
            <div className="p-0 grid grid-cols-7 gap-6">
              <Card className="border border-slate-500 col-span-2">
                <CardHeader className="p-4">
                  <h2 className="text-base font-semibold text-[#2b4033]">Platform Activity</h2>
                </CardHeader>
                <CardContent className="pl-4 pr-4 text-sm">
                  <div className="space-y-4">
                    <div className=" border border-slate-300 px-4 py-2 rounded bg-[#acc8ac]">
                      <p><span className="text-lg font-semibold">{profileData.profileViews} </span> Profile Views</p>
                    </div>
                    <div className=" border border-slate-300 px-4 py-2 rounded bg-[#acc8ac]">
                      <p><span className="text-lg font-semibold">{profileData.searchAppearance} </span> Search Appearance</p>
                    </div>
                    <div className=" border border-slate-300 px-4 py-2 rounded bg-[#acc8ac]">
                      <p><span className="text-lg font-semibold">{profileData.interviewsCompleted} </span> Interviews Completed</p>
                    </div>
                    <div className=" border border-slate-300 px-4 py-2 rounded bg-[#acc8ac]">
                      <p><span className="text-lg font-semibold">{profileData.challengesCompleted} </span> Challenges Completed</p>
                    </div>
                    <div className=" border border-slate-300 px-4 py-2 rounded bg-[#acc8ac]">
                      <p><span className="text-lg font-semibold">{profileData.daysOnPlatform} </span> Days On The Platform</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className='col-span-5'>
                <div>
                  <div className="relative h-[57vh] rounded-t-lg bg-gray-200" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url("${videoImg}")` }}>
                    <Dialog>
                      <DialogTrigger>
                        <CirclePlay className="absolute inset-0 m-auto w-16 h-16 text-[#F1F6FF]" />
                      </DialogTrigger>
                      <DialogContent className="max-w-[80vw] md:max-w-[70vw] lg:max-w-[70vw]">
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
                  <div className="p-4 bg-black/50 rounded-b-lg">
                    <div className="flex items-center justify-between text-sm text-white">
                      <span>Uploaded: {profileData.videoUploadDate}</span>
                      <span>Last viewed: {profileData.videoLastViewed}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-[#EAB308] text-sm flex items-center">
                        ⚠️ Consider updating your video to keep your profile current
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* About Section */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#2b4033]">About Me</h2>
                <p className="text-gray-700">
                  {profileData.about}
                </p>
              </CardContent>
            </Card>

            {/* AI Summary and Professional Info Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-[#c3dac4] border border-slate-300">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 text-[#2b4033]">AI Summary</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">{profileData.aiSummary}</p>

                    <div className="space-y-2">
                      <h3 className="font-medium text-[#2b4033]">AI Highlights: These are your best features</h3>
                      {profileData.aiHighlights.map((highlight, index) => (
                        <div className="flex items-start space-x-2" key={index}>
                          <Star fill='#3B82F6' size={18} className="text-blue-500 mt-1" />
                          <span className='text-gray-700'>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-[#2b4033]">AI Recommendations: These are areas for improvement</h3>
                      <div className="space-y-2">
                        {profileData.aiRecommendations.map((recommendation, index) => (
                          <div className="flex items-start space-x-2" key={index}>
                            <FaLightbulb className='text-yellow-500 mt-1 w-5 h-4' />
                            <span className='text-gray-700'>{recommendation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#c3dac4] border border-slate-300">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 text-[#2b4033]">Professional Info</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-700">Location</h3>
                      <p className="font-medium">{profileData.registrationData.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Industry</h3>
                      <p className="font-medium">{profileData.registrationData.industry}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Years of Experience</h3>
                      <p className="font-medium">{profileData.registrationData.yearsExperience}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Current Role</h3>
                      <p className="font-medium">{profileData.registrationData.currentRole}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Company</h3>
                      <p className="font-medium">{profileData.registrationData.company}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">LinkedIn</h3>
                      <a href={profileData.registrationData.linkedIn} className="font-medium text-green-700 hover:text-green-800">{profileData.registrationData.linkedIn}</a>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Portfolio</h3>
                      <a href={profileData.registrationData.website} className="font-medium text-green-700 hover:text-green-800">{profileData.registrationData.website}</a>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Github</h3>
                      <a href={profileData.registrationData.github} className="font-medium text-green-700 hover:text-green-800">{profileData.registrationData.github}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Section */}
            <Tabs defaultValue="soft" className=" w-full bg-[#c3dac4] border border-slate-300 p-6 rounded-lg">
              <TabsList>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                <TabsTrigger value="technical">Technical Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="soft" className="space-y-2">
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {profileData.softSkills.map((skill, index) => (
                    // <div className="flex items-center space-x-2" key={index}>
                    //   <FaAward className="w-4 h-4 text-gray-500" />
                    //   <span>{skill.name}</span>
                    // </div>
                    <Card key={index} className="">
                      <CardHeader className="p-4" >
                        <CardTitle className="text-base" >
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
              <TabsContent value="technical" >
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {profileData.skills.map((skill, index) => (
                    <Card key={index} className="">
                      <CardHeader className="p-4" >
                        <CardTitle className="text-base" >
                          <div className="flex items-center space-x-2">
                            <FaAward className="w-3.5 h-3.5 text-gray-500" />
                            <span>{skill.name}</span>
                          </div>
                        </CardTitle>
                        < CardDescription >
                          <Badge variant="secondary" className={`${getProficiencyColor(skill.proficiency)}`} >
                            {!skill.proficiency ? 'Add proficiency' : skill.proficiency}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* experience */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-6">
                <div className=''>
                  <h2 className="text-lg font-semibold mb-4 text-[#2b4033]">Experience</h2>
                  <div className="space-y-4 ">
                    {profileData.experience.map((exp, index) => (
                      <div className="border-l-4 border-[#94a49c] pl-4" key={index}>
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-mediu ">{exp.position}</h4>
                            <p className="text-sm text-gray-600">{exp.employer} · {format(exp.startDate, "MMM yyyy")} - {" "} {exp.currentlyWorking ? "Present" : format(exp.endDate, "MMM yyyy")}</p>
                          </div>
                        </div>
                        <p className="text-sm mt-2 text-gray-800">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* education */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-[#2b4033]">Education</h2>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">MBA - Business Administration</h4>
                      <p className="text-sm text-gray-600">Stanford University · 2018</p>
                    </div>
                    <div>
                      <h4 className="font-medium">BS - Computer Science</h4>
                      <p className="text-sm text-gray-600">University of California, Berkeley · 2014</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Goals */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#2b4033]">Career Goals</h2>
                <div className="space-y-3">
                  {profileData.careerGoals.map((goal, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <CheckCircle className="w-5 h-5 text-gray-500" />
                      <span className='text-gray-700'>{goal.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Testimonials */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-[#2b4033]">Video Testimonials</h2>
                  <Button className="bg-transparent border-none hover:bg-transparent text-[#2b4033] hover:text-[#1e3728]" size="sm"><CirclePlus strokeWidth={2.5} /> Request new</Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {profileData.videoTestimonials.map((testimonial, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative h-40 bg-gray-200 rounded-lg" >
                        <img src={testimonial.thumbnail} alt="Testimonial" className="w-full h-full object-cover rounded-lg" />
                        <Dialog>
                          <DialogTrigger>
                            <CirclePlay className="absolute inset-0 m-auto w-16 h-16 text-[#F1F6FF]" />
                          </DialogTrigger>
                          <DialogContent className="max-w-[80vw] md:max-w-[70vw] lg:max-w-[70vw]">
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
                        <h4 className="font-medium text-[#2b4033]">Sarah Chen</h4>
                        <p className="text-sm text-gray-700">Engineering Director at Tech Solutions Inc</p>
                        <p className="text-xs text-gray-500">Recorded 2024-03-15</p>
                      </div>
                    </div>
                  )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-[#c3dac4] border border-slate-500">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <img src={getImageUrl(profileData.avatar)} alt="Profile" className="rounded-lg mb-4" />
                  <h2 className="text-xl font-semibold text-[#2b4033]">{profileData.name}</h2>
                  {profileData.isVerified && (
                    <div className="flex items-center space-x-1 mt-1">
                      <BadgeCheck strokeWidth={2.5} className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">Verified profile</span>
                    </div>
                  )}
                  <div className="w-full mt-6 space-y-3">
                    <Button onClick={() => navigate('/jobseeker/settings')} className=" bg-[#dce2d4] hover:bg-[#c2c8bb] text-black w-full flex items-center justify-center">
                      <Edit className="w-4 h-4" />
                      Edit profile
                    </Button>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      <IoIosRocket />Promote profile
                    </Button>
                    <Button className="w-full bg-[#2b4033] hover:bg-[#1e3728]">
                      <FaVideo /> Get Interview Coaching
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Activity */}


            {/* Upcoming Interviews */}
            <Card className="border border-slate-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold text-[#2b4033]">Upcoming Interviews</h2>
                <Button variant="link" className="text-sm text-[#2b4033]"><ArrowRight /> View all</Button>
              </CardHeader>
              <CardContent>
                {profileData.upComingInterviews.length == 0 ?
                  <div className="border px-2 py-2 rounded bg-[#c3dac4]">
                    <p className='text-base text-gray-800'>You do not have any upcoming interviews yet.</p>
                  </div>
                  :
                  <div className="space-y-4">
                    {profileData.upComingInterviews.map((interview, index) => (
                      // <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <div key={index} className="border px-2 py-2 rounded bg-[#c3dac4]">
                        <h3 className="font-medium">{interview.position}</h3>
                        <p className="text-sm text-gray-600">{interview.company}</p>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{interview.date} at {interview.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                }

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-1 cursor-pointer ${active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
    }`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default Dashboard;