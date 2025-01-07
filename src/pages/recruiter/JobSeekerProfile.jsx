import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdVerified } from "react-icons/md";
import {
  FaArrowLeft,
  FaBookmark,
  FaBullseye,
  FaCheckCircle,
  FaHeart,
  FaLinkedin,
  FaPhone,
  FaPhoneAlt,
  FaRegCircle,
  FaRobot,
  FaShare,
  FaStar,
  FaStickyNote,
  FaTimesCircle,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { getJobseekerById } from "@/services/api/api";
import { getImageUrl } from "@/services/helpers/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const JobSeekerProfile = () => {
  const { id } = useParams();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prof = await getJobseekerById(id)
        setProfile(prof.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FadeLoader loading={loading} size={15} />
      </div>
    )
  }

  const analysis = typeof (profile.JobSeeker.videoAnalysis) == "string" ? JSON.parse(profile.JobSeeker.videoAnalysis) : profile.JobSeeker.videoAnalysis;
  console.log(analysis)
  const profileData = {
    name: profile.name,
    isVerified: profile.isVerified,
    tags: analysis["keywords and expertise"],
    strengths: analysis.strengths,
    softSkills: analysis["soft skills"],
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
    color: profile.JobSeeker.backgroundColor,
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
    recruiterFeedback: {
      accuracy: 92,
      totalReviews: 45,
      comments: [
        {
          name: "Sarah Miller",
          role: "Senior Tech Recruiter",
          company: "TalentScope",
          rating: 5,
          comment:
            "The AI analysis accurately captured leadership qualities and technical expertise. Particularly impressed with soft skills detection.",
          date: "2024-03-15",
        },
        {
          name: "James Chen",
          role: "Technical Recruiting Lead",
          company: "InnovateHR",
          rating: 4,
          comment:
            "Good overall assessment, though I'd emphasize project management skills more prominently in the analysis.",
          date: "2024-03-10",
        },
      ],
      improvementSuggestions: [
        "Consider adding industry-specific terminology detection",
        "Include more quantitative metrics in analysis",
        "Add comparison with industry benchmarks",
        "Enhance detection of leadership style patterns",
      ],
    },
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
  };

  const handleInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  const handleFeedbackSelect = (value) => {
    setSelectedFeedback(value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    setSelectedFeedback("");
    setFeedback("");
  };

  return (
    <div className={`min-h-screen p-4 md:p-8`} style={{ backgroundColor: profileData.color }}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <FaArrowLeft />
              Back
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
            <FaBookmark />
              Save
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
            <FaShare />
              Share
            </button>
            <button
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <FaStickyNote />
              Notes
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
              <FaTimesCircle />
              Remove from Job
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
              <FaPhoneAlt />
              Request Phone Interview
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2">
              <FaVideo />
              Request Virtual Interview
            </button>
          </div>
        </div>

        {isNotesOpen && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows="4"
            />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
            <FaArrowLeft />
            Back to Search
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
            <FaUsers />
            Find Similar Candidates
          </button>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-blue-100">
          <div className="relative w-full h-[400px]">
            <video
              className="w-full h-full object-cover"
              controls
              src={profileData.videoUrl}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-semibold font-roboto">
                {profileData.name}
              </h1>
              {profileData.isVerified && (
                <span className="text-blue-500">
                  <MdVerified className="text-xl" />
                </span>
              )}
              <div className="flex gap-2 ml-auto">
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

            <div className="mt-4 p-4 bg-blue-50/50 rounded-lg space-y-6 backdrop-blur-sm">
              <div>
                <h3 className="text-lg font-semibold mb-2 font-roboto">
                  AI Analysis
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {profileData.aiAnalysis}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 font-roboto">
                  AI Highlights
                </h3>
                <ul className="list-none space-y-2">
                  {profileData.aiHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaStar className="text-yellow-400 mt-1" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 font-roboto flex items-center gap-2">
                  AI Analysis Rating
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {profileData.recruiterFeedback.accuracy}% Accuracy
                  </span>
                  <span className="text-xs text-gray-500">
                    ({profileData.recruiterFeedback.totalReviews} reviews)
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 font-roboto flex items-center gap-2">
              Keywords & Expertise
              <span className="text-xs text-gray-500 font-normal">
                <FaRobot className="mr-1 inline" />
                AI-analyzed from video
              </span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                Strengths
                <span className="text-xs text-gray-500 font-normal">
                  <FaRobot className="mr-1 inline" />
                  Based on video analysis
                </span>
              </h3>
              <div className="space-y-2">
                {profileData.strengths.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 font-roboto flex items-center gap-2">
              Soft Skills
              <span className="text-xs text-gray-500 font-normal">
                <FaRobot className="mr-1 inline" />
                Detected in video
              </span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {profileData.softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg flex items-center gap-2"
                >
                  <FaHeart />
                  {skill}
                </div>
              ))}
            </div>
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
              <FaLinkedin className="text-xl" />
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
                <FaBullseye className="text-blue-500 mt-1" />
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
              <i className="fas fa-plus-circle"></i>
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

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 font-roboto">
            Recruiter Feedback
          </h2>
          <form onSubmit={handleSubmitFeedback} className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleFeedbackSelect("good")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${selectedFeedback === "good"
                    ? "bg-green-500 text-white"
                    : "bg-green-100 text-green-800"
                  }`}
              >
                <i className="fas fa-check"></i>
                Good Match (80%)
              </button>
              <button
                type="button"
                onClick={() => handleFeedbackSelect("neutral")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${selectedFeedback === "neutral"
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                <i className="fas fa-minus"></i>
                Neutral (5%)
              </button>
              <button
                type="button"
                onClick={() => handleFeedbackSelect("not-good")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${selectedFeedback === "not-good"
                    ? "bg-red-500 text-white"
                    : "bg-red-100 text-red-800"
                  }`}
              >
                <i className="fas fa-times"></i>
                Not a Good Match (10%)
              </button>
            </div>
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback to help improve our AI analysis"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={!selectedFeedback}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
