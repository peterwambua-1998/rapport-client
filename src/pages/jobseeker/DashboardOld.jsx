
import React, { useEffect, useState } from 'react';
import { Edit, Rocket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import useAuth from '@/hooks/useAuth';
import { FadeLoader } from 'react-spinners';
import { formatDateTime, getImageUrl } from '@/services/helpers/helpers';
import { useNavigate } from 'react-router-dom';
import avatar from '@/assets/profile.jpg'
import { FaAward, FaBullseye, FaCheckCircle, FaEdit, FaEnvelope, FaExclamationTriangle, FaLightbulb, FaLinkedin, FaPlayCircle, FaRegCalendar, FaRocket, FaSignOutAlt, FaStar, FaVideo } from 'react-icons/fa';
import { FaCirclePlus, FaTrophy } from 'react-icons/fa6';
import { getProfile } from '@/services/api/api';
import { HiBadgeCheck } from "react-icons/hi";

const Dashboard = () => {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(85);
  const [searchVisibility, setSearchVisibility] = useState(92);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [upcomingInterviews] = useState([
    {
      company: "Tech Corp Inc.",
      position: "Senior Software Engineer",
      date: "2024-01-25",
      time: "14:00",
    },
    {
      company: "Innovation Labs",
      position: "Product Manager",
      date: "2024-01-28",
      time: "10:00",
    },
  ]);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const seeker = response.data;
      const profile = seeker.JobSeeker;
      setProfile(seeker);
      setLoading(false);
      console.log(typeof profile.videoAnalysis)
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
    isVerified: profile.isVerified,
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
        thumbnail: "/testimonial-1.jpg",
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
        position: "Product Manager",
        date: "2024-01-28",
        time: "10:00",
      },
    ]
  };

  const handleInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <div href="/messages" className="text-gray-600 hover:text-gray-800">
              <FaEnvelope className="text-3xl hover:cursor-pointer" onClick={() => navigate('/jobseeker/messages')} />
              {hasNewMessage && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-blue-100">
          <div className="relative w-full h-[400px]">
            <video
              className="w-full h-full object-cover"
              controls
              src={profileData.videoUrl}
            />
            
          </div>
          <div>
          <div className=" bg-black/50 text-white p-3 text-sm">
              <div className="flex justify-between">
                <span>Uploaded: {profileData.videoUploadDate}</span>
                <span>Last viewed: {profileData.videoLastViewed}</span>
              </div>
              {profileData.daysSinceUpload > 90 && (
                <div className="mt-1 text-yellow-300">
                  <FaExclamationTriangle className='mr-2 inline' />
                  Consider updating your video to keep your profile current
                </div>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-semibold font-roboto">
                {profileData.name}
              </h1>
              {profileData.isVerified && (
                <span className="text-blue-500">
                  <HiBadgeCheck className='text-3xl' />
                </span>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => logout()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Sign out
                </button>
                <button
                  onClick={() => navigate('/jobseeker/profile')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2">
                  <FaRocket />
                  Promote Profile
                </button>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${profileData.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {profileData.isActive ? "Active" : "Inactive"}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${profileData.isPublic
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {profileData.isPublic ? "Public" : "Private"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Upcoming Interviews</h2>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold">{interview.position}</h3>
                      <p className="text-gray-600">{interview.company}</p>
                      <p className="text-sm text-gray-500">
                        <FaRegCalendar className='mr-2 inline' />{interview.date} at {interview.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Platform Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-3xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">
                      Applications Submitted
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-600">
                      Interviews Completed
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-3xl font-bold text-purple-600">
                      85%
                    </div>
                    <div className="text-sm text-gray-600">
                      Profile Completion
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50/50 rounded-lg space-y-6 backdrop-blur-sm">
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Interview History</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">
                            Senior Software Engineer
                          </h3>
                          <p className="text-gray-600">Tech Corp Inc.</p>
                          <p className="text-sm text-gray-500">
                            Interviewed on Jan 15, 2024
                          </p>
                        </div>
                        <span className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Product Manager</h3>
                          <p className="text-gray-600">Innovation Labs</p>
                          <p className="text-sm text-gray-500">
                            Interviewed on Jan 10, 2024
                          </p>
                        </div>
                        <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">UX Designer</h3>
                          <p className="text-gray-600">Design Studio Co</p>
                          <p className="text-sm text-gray-500">
                            Interviewed on Jan 5, 2024
                          </p>
                        </div>
                        <span className="px-2 py-1 text-sm rounded-full bg-red-100 text-red-800">
                          Not Selected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 ">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100 mb-4">
            <h3 className="text-lg font-semibold mb-2 font-roboto">
              AI Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {profileData.aiAnalysis}
            </p>
            <h2 className="text-xl font-semibold mb-4 font-roboto">
              Profile Analytics
            </h2>
            <div className="space-y-4 mb-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Profile Completion</span>
                  <span>{profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span>Search Visibility</span>
                  <span>{searchVisibility}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${searchVisibility}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 font-roboto">
                AI Highlights: These are your best features
              </h3>
              <ul className="list-none space-y-2">
                {profileData.aiHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaStar className='text-yellow-400 mt-1' />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 font-roboto">
                AI Recommendations: These are areas for improvement
              </h3>
              <ul className="list-none space-y-2">
                {profileData.aiRecommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaLightbulb className='text-blue-400 mt-1' />
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold font-roboto">
                Skills & Challenges: Show off your skills
              </h2>
              <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-2">
                <FaCirclePlus />
                Add New Skill
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                {profileData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FaAward className="text-blue-500" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${skill.level === "Expert"
                          ? "bg-purple-100 text-purple-800"
                          : skill.level === "Advanced"
                            ? "bg-blue-100 text-blue-800"
                            : skill.level === "Intermediate"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{skill.challenges} challenges completed</span>
                      <span>Last updated: {skill.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 font-roboto">
                  Available Challenges
                </h3>
                <div className="space-y-3">
                  {profileData.skillChallenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FaTrophy className='text-yellow-500' />
                        <span>{challenge}</span>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600">
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold font-roboto">
              Practice Questions
            </h2>
            <button onClick={() => navigate('/jobseeker/interview-prep')} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2">
              <FaVideo />
              Get Interview Coaching
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.practiceQuestions.map((q, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:border-purple-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${q.difficulty === "Hard"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {q.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{q.category}</span>
                </div>
                <p className="text-gray-800 mt-2">{q.question}</p>
                <button className="mt-4 text-purple-500 hover:text-purple-600 text-sm flex items-center gap-2">
                  <FaPlayCircle />
                  Practice Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-6 font-roboto">
            Professional Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Location</label>
                <p className="font-medium">
                  {profileData.registrationData.location}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Industry</label>
                <p className="font-medium">
                  {profileData.registrationData.industry}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Years of Experience
                </label>
                <p className="font-medium">
                  {profileData.registrationData.yearsExperience}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Education</label>
                <p className="font-medium">
                  {profileData.registrationData.education}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Current Role</label>
                <p className="font-medium">
                  {profileData.registrationData.currentRole}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Company</label>
                <p className="font-medium">
                  {profileData.registrationData.company}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">LinkedIn</label>
                <p className="font-medium">
                  {profileData.registrationData.linkedIn}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Portfolio</label>
                <p className="font-medium">
                  {profileData.registrationData.website}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 font-roboto flex items-center gap-2">
            LinkedIn Profile
            <a
              href={profileData.linkedInProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              <FaLinkedin className='text-2xl' />
            </a>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Experience</h3>
              <div className="space-y-4">
                {profileData.linkedInProfile.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-medium">{exp.role}</h4>
                    <p className="text-sm text-gray-600">
                      {exp.company} • {exp.duration}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      {exp.description}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <FaCheckCircle className="text-green-500 mt-1" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Education</h3>
                <div className="space-y-3">
                  {profileData.linkedInProfile.education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">
                        {edu.school} • {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                <div className="space-y-3">
                  {profileData.linkedInProfile.certifications.map(
                    (cert, index) => (
                      <div key={index}>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-gray-600">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.linkedInProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 font-roboto">
            Career Goals
          </h2>
          <div className="space-y-3">
            {profileData.careerGoals.map((goal, index) => (
              <div key={index} className="flex items-start gap-3">
                <FaBullseye className='text-blue-500 mt-1' />
                <p className="text-gray-700">{goal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold font-roboto">
              Video Testimonials
            </h2>
            <button
              onClick={handleInviteClick}
              className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-2"
            >
              <FaCirclePlus />
              Request New Testimonial
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileData.videoTestimonials.map((testimonial, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={testimonial.thumbnail}
                    alt={`Video testimonial from ${testimonial.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 text-xs rounded">
                    {testimonial.duration}
                  </div>
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${testimonial.status === "Approved"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                      } text-white`}
                  >
                    {testimonial.status}
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.relationship} • Recorded{" "}
                    {testimonial.recordedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
