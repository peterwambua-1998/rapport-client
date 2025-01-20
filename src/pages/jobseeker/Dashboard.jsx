'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit, Star,
  Users, MessageCircle, CheckCircle,
  Calendar,
  Search,
  CirclePlay,
  Lightbulb,
  BadgeCheck,
  CirclePlus
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import profileImage from "@/assets/profile.png";
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { getProfile } from '@/services/api/api';
import { formatDateTime, getImageUrl } from '@/services/helpers/helpers';
import videoImg from '@/assets/office-background-image.jpg'
import { IoIosRocket, IoLogoLinkedin } from 'react-icons/io';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaAward } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa6';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import interviewOne from "@/assets/interview-1.webp"



const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const seeker = response.data;
      setProfile(seeker);
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

  const analysis = typeof (profile.JobSeeker.videoAnalysis) == "string" ? JSON.parse(profile.JobSeeker.videoAnalysis) : profile.JobSeeker.videoAnalysis;

  const profileData = {
    name: profile.name,
    about: profile.JobSeeker.about,
    isVerified: profile.isVerified,
    avatar: profile.avatar,
    profileViews: 12,
    searchAppearance: 8,
    practiceQuestions: [
      {
        question: "How do you handle conflicts within your team?",
        difficulty: "Medium",
        category: "Leadership",
      },
      {
        question:
          "Describe a time you had to pivot product strategy based on user feedback",
        difficulty: "Hard",
        category: "Product Strategy",
      },
      {
        question: "What metrics do you use to measure product success?",
        difficulty: "Medium",
        category: "Analytics",
      },
      {
        question: "How do you prioritize features in your product roadmap?",
        difficulty: "Hard",
        category: "Product Management",
      },
    ],
    skills: profile.JobseekerSkills.map(skill => (
      {
        name: skill.Skill.name, level: "Expert", challenges: 8, lastUpdated: formatDateTime(skill.Skill.updatedAt)
      }
    )),
    softSkills: ['Leadership', 'Team Work', 'Communication'],
    skillChallenges: [
      "Present a technical concept to non-technical stakeholders",
      "Resolve a team conflict scenario",
      "Create a project timeline and resource allocation plan",
      "Demonstrate active listening in a mock client meeting",
    ],
    color: "#4A90E2",
    videoUrl: getImageUrl(profile.JobSeeker.videoUrl),
    completedChallenges: 7,
    videoUploadDate: new Date(profile.JobSeeker.updatedAt).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    videoLastViewed: "2024-03-20",
    daysSinceUpload: 95,
    isActive: profile.JobSeeker.activeStatus,
    isPublic: profile.JobSeeker.profileVisible,
    aiAnalysis: analysis.analysis,
    aiHighlights: analysis.highlights,
    aiRecommendations: analysis.recommendations,
    registrationData: {
      location: profile.JobSeeker.city,
      industry: profile.JobSeeker.Industry.name,
      yearsExperience: profile.JobSeeker.YearsOfExperience.name,
      education: profile.JobSeeker.EducationLevel.name,
      currentRole: "Senior Product Manager",
      company: "Tech Innovations Inc",
      linkedIn: "linkedin.com/in/johnsmith",
      website: "johnsmith.com",
    },
    videoTestimonials: [
      {
        name: "Sarah Chen",
        role: "Engineering Director",
        relationship: "Former Manager",
        company: "Tech Solutions Inc",
        duration: "2:15",
        recordedDate: "2024-02-15",
        thumbnail: interviewOne,
        videoUrl: "/testimonial-1.mp4",
        status: "Approved",
      },
      {
        name: "Michael Rodriguez",
        role: "Senior Developer",
        relationship: "Team Member",
        company: "Tech Innovations Inc",
        duration: "1:45",
        recordedDate: "2024-02-10",
        thumbnail: "/testimonial-2.jpg",
        videoUrl: "/testimonial-2.mp4",
        status: "Approved",
      },
      {
        name: "Emily Watson",
        role: "Product Owner",
        relationship: "Project Collaborator",
        company: "Digital Ventures",
        duration: "2:30",
        recordedDate: "2024-02-01",
        thumbnail: "/testimonial-3.jpg",
        videoUrl: "/testimonial-3.mp4",
        status: "Pending",
      },
    ],
    linkedInProfile: {
      url: "https://linkedin.com/in/johnsmith",
      skills: [
        "Product Strategy",
        "Agile Methodologies",
        "Cross-functional Leadership",
        "Data Analytics",
        "User Experience (UX)",
        "Strategic Planning",
        "Team Building",
      ],
      experience: [
        {
          role: "Senior Product Manager",
          company: "Tech Innovations Inc",
          duration: "2021 - Present",
          description:
            "Leading product strategy and development for enterprise SaaS solutions. Managing a team of 12 across product, design, and engineering.",
          achievements: [
            "Launched 3 major product features increasing revenue by 40%",
            "Reduced customer churn by 25% through strategic product improvements",
            "Led cross-functional team of 20+ members across 3 continents",
          ],
        },
        {
          role: "Product Manager",
          company: "Digital Solutions Co",
          duration: "2018 - 2021",
          description:
            "Managed full product lifecycle for B2B software platform",
          achievements: [
            "Grew user base from 10k to 100k in 18 months",
            "Implemented agile methodologies improving delivery time by 35%",
            "Secured $2M in additional funding through product success",
          ],
        },
      ],
      education: [
        {
          degree: "MBA - Business Administration",
          school: "Stanford University",
          year: "2018",
        },
        {
          degree: "BS - Computer Science",
          school: "University of California, Berkeley",
          year: "2014",
        },
      ],
      certifications: [
        {
          name: "Professional Scrum Master (PSM I)",
          issuer: "Scrum.org",
          year: "2023",
        },
        {
          name: "Product Management Certification",
          issuer: "Product School",
          year: "2022",
        },
      ],
    },
    careerGoals: [
      "Transition to Director of Product role within 2 years",
      "Build and scale products that impact millions of users",
      "Mentor junior product managers and build strong teams",
      "Develop expertise in AI/ML product strategy",
    ],
    upComingInterviews: [
      {
        company: "Tech Corp Inc.",
        position: "Senior Software Engineer",
        date: "2024-01-25",
        time: "14:00",
      },
      {
        company: "Innovation Labs",
        position: "Senior Software Engineer",
        date: "2024-01-28",
        time: "10:00",
      },
      {
        company: "Google",
        position: "Senior Software Engineer",
        date: "2024-01-28",
        time: "10:00",
      },
    ]
  };

  return (
    <div className="min-h-screen bg-[#edeeed]">
      {/* Navigation */}


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-[#2b4033]">Profile</h1>
              <div className="flex space-x-2">
                <Badge
                  variant="secondary"
                  className={`${profileData.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {profileData.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`${profileData.isPublic
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {profileData.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
            </div>

            {/* Video Section */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64 rounded-t-lg bg-gray-200" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url("${videoImg}")` }}>
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
              </CardContent>
            </Card>

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
                    <p className="text-gray-700">{profileData.aiAnalysis}</p>

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
                            <Lightbulb fill="#facc15" size={20} className='text-yellow-400 mt-1' />
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
                      <h3 className="text-sm text-gray-700">Education</h3>
                      <p className="font-medium">{profileData.registrationData.education}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Current Role</h3>
                      <p className="font-medium">{profileData.registrationData.currentRole}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Company</h3>
                      <p className="font-medium">Tech Innovations Inc</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">LinkedIn</h3>
                      <a href='#' className="font-medium text-green-700 hover:text-green-800">{profileData.registrationData.linkedIn}</a>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">Portfolio</h3>
                      <a href='#' className="font-medium text-green-700 hover:text-green-800">{profileData.registrationData.website}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Section */}
            <Tabs defaultValue="technical" className=" w-full bg-[#c3dac4] border border-slate-300 p-6 rounded-lg">
              <TabsList>
                <TabsTrigger value="technical"   >Technical Skills</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="technical" className="space-y-2">
                {profileData.skills.map((skill, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <FaAward className="w-4 h-4 text-gray-500" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="soft" className="space-y-2">
                {profileData.softSkills.map((skill, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <FaAward className="w-4 h-4 text-gray-500" />
                    <span>{skill}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            {/* Career Goals */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#2b4033]">Career Goals</h2>
                <div className="space-y-3">
                  {profileData.careerGoals.map((goal, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span className='text-gray-700'>{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn Profile */}
            <Card className="bg-[#c3dac4] border border-slate-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-6">
                  <h2 className="text-lg font-semibold text-[#2b4033]">LinkedIn Profile</h2>
                  <IoLogoLinkedin className="w-6 h-6 text-blue-500" />
                </div>

                {/* Experience */}
                <div className=" grid grid-cols-2 gap-10">
                  <div className=''>
                    <h3 className="font-medium mb-2 text-[#18241d]">Experience</h3>
                    <div className="space-y-4 ">
                      <div className="border-l-4 border-green-500 pl-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-mediu ">Senior Product Manager</h4>
                            <p className="text-sm text-gray-600">Tech Innovations Inc · 2021 - Present</p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-800">Leading product strategy and development for enterprise SaaS solutions. Managing a team of 12 across product, design, and engineering.</p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-800">
                          <li>Launched 3 major product features increasing revenue by 40%</li>
                          <li>Launched 3 major product features increasing revenue by 40%</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">Product Manager</h4>
                            <p className="text-sm text-gray-600">Digital Solutions Co · 2019 - 2021</p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-800">Managed full product lifecycle for B2B software platform</p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-800">
                          <li>Grew user base from 10k to 100k in 18 months</li>
                          <li>Implemented Agile methodologies improving delivery time by 35%</li>
                        </ul>
                      </div>
                    </div>
                  </div>


                  {/* Education */}
                  <div className='space-y-6'>
                    <div>
                      <h3 className="font-medium mb-2">Education</h3>
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

                    {/* Certifications */}
                    <div>
                      <h3 className="font-medium mb-2">Certifications</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Professional Scrum Master (PSM I)</h4>
                          <p className="text-sm text-gray-600">Scrum.org · 2023</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Product Management Certification</h4>
                          <p className="text-sm text-gray-600">Product School · 2022</p>
                        </div>
                      </div>
                    </div>
                  </div>

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
                      <div className="relative h-40 bg-gray-200 rounded-lg">
                        <img src={testimonial.thumbnail} alt="Testimonial" className="w-full h-full object-cover rounded-lg" />
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
            <Card className="bg-white border border-slate-300">
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
                      <Edit  className="w-4 h-4" />
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
            <Card className="border border-slate-300">
              <CardHeader>
                <h2 className="text-lg font-semibold text-[#2b4033]">Platform Activity</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span>Profile Views</span>
                    </div>
                    <span className="text-lg font-semibold">{profileData.profileViews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-gray-500" />
                      <span>Search Appearance</span>
                    </div>
                    <span className="text-lg font-semibold">{profileData.searchAppearance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Interviews */}
            <Card className="border border-slate-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold text-[#2b4033]">Upcoming Interviews</h2>
                <Button variant="link" className="text-sm text-[#2b4033]">View all</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.upComingInterviews.map((interview, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium">{interview.position}</h3>
                      <p className="text-sm text-gray-600">{interview.company}</p>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{interview.date} at {interview.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
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