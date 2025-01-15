import { fetchEducationLevels, fetchIndustrys, fetchSkillLevels, fetchYearsOfExperiences, getJobseekers } from "@/services/api/api";
import { getImageUrl } from "@/services/helpers/helpers";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaShareAlt, FaStickyNote, FaTimes, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const MainComponent = ({ videos = [], jobs = [], industries = [], educationLevels = [], yearsOfExperiences = [], skillLevels = [] }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [aiQuery, setAiQuery] = React.useState("");
  const [aiResponse, setAiResponse] = React.useState("");
  const [selectedJob, setSelectedJob] = React.useState("");
  const [selectedCandidate, setSelectedCandidate] = React.useState(null);
  const [showNoteModal, setShowNoteModal] = React.useState(false);
  const [candidateNotes, setCandidateNotes] = React.useState({});
  const [selectedCandidates, setSelectedCandidates] = React.useState([]);
  const [durations, setDurations] = useState({});
  const videoRefs = useRef({});
  const [filters, setFilters] = React.useState({
    industry: "",
    experience: "",
    certificate: "",
    location: "",
    tag: "",
    verified: "",
    rating: "",
  });
  const navigate = useNavigate();
  const filteredVideos = videos.filter((video) => {
    console.log(filters)
    const matchesSearch =
      video.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      !filters.industry || video.industry == filters.industry;
    const matchesExperience =
      !filters.experience || video.experienceLevel === filters.experience;
    const matchesCertificate =
      !filters.certificate || video.certificates.includes(filters.certificate);
    const matchesLocation =
      !filters.location || video.location === filters.location;
    const matchesTag = !filters.tag || video.tags.includes(filters.tag);
    const matchesVerified =
      !filters.verified || video.verified === (filters.verified === "true");
    const matchesRating =
      !filters.rating || video.rating >= parseInt(filters.rating);
    return (
      matchesSearch &&
      matchesIndustry &&
      matchesExperience &&
      matchesCertificate &&
      matchesLocation &&
      matchesTag &&
      matchesVerified &&
      matchesRating
    );
  });

  const handleAiQuery = () => {
    setAiResponse("AI is analyzing your query...");
  };

  const handleShare = (video) => {
    const shareUrl = `${window.location.origin}/candidate/${video.id}`;
    navigator.clipboard.writeText(shareUrl);
  };

  const handleSaveNote = (note) => {
    if (selectedCandidate) {
      setCandidateNotes({
        ...candidateNotes,
        [selectedCandidate.id]: note,
      });
      setShowNoteModal(false);
    }
  };

  const handleLoadedMetadata = (id) => {
    if (videoRefs.current[id]) {
      console.log(videoRefs.current[id])
      setDurations(prev => ({
        ...prev,
        [id]: videoRefs.current[id].duration
      }));
    }
  };

  const formatDuration = (seconds) => {
    
    if (!seconds) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-poppins font-bold text-[#2c3e50] mb-6">
          AI Interview Library
        </h1>

        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-poppins font-semibold mb-4">
            Ask AI Assistant
          </h2>
          <div className="flex flex-col gap-4">
            <textarea
              name="ai-query"
              rows="4"
              placeholder="Ask about candidates or job requirements..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] resize-none"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={handleAiQuery}
                className="bg-[#3498db] text-white px-6 py-2 rounded-lg hover:bg-[#2980b9] transition-colors"
              >
                Ask AI
              </button>
              {aiQuery && (
                <button
                  onClick={() => {
                    setAiQuery("");
                    setAiResponse("");
                  }}
                  className="px-6 py-2 rounded-lg border border-[#e0e0e0] hover:bg-[#f8f9fa] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            {aiResponse && (
              <div className="bg-[#f8f9fa] p-4 rounded-lg border mt-4">
                <p className="text-[#2c3e50]">{aiResponse}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <select
            name="industry"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            value={filters.industry}
            onChange={(e) =>
              setFilters({ ...filters, industry: e.target.value })
            }
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.name}>
                {industry.name}
              </option>
            ))}
          </select>
          <select
            name="experience"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          >
            <option value="">All Experience Levels</option>
            {yearsOfExperiences.map((experience) => (
              <option key={experience.id} value={experience.name}>
                {experience.name}
              </option>
            ))}
          </select>
          <select
            name="certificate"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            value={filters.certificate}
            onChange={(e) =>
              setFilters({ ...filters, certificate: e.target.value })
            }
          >
            <option value="">All Certificates</option>
            <option value="pmp">PMP</option>
            <option value="cpa">CPA</option>
            <option value="aws">AWS Certified</option>
            <option value="scrum">Scrum Master</option>
          </select>
          <select
            name="location"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="us-east">US East</option>
            <option value="us-west">US West</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
          </select>
          <select
            name="verified"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            value={filters.verified}
            onChange={(e) =>
              setFilters({ ...filters, verified: e.target.value })
            }
          >
            <option value="">All Verification</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>
          <select
            name="rating"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        <div className="relative mb-8">
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("video", JSON.stringify(video));
                  }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden w-full cursor-move hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <div className="aspect-video bg-[#e9ecef]">
                      <video
                        ref={el => videoRefs.current[video.id] = el}
                        onLoadedMetadata={() => handleLoadedMetadata(video.id)}
                        className="w-full h-full object-cover"
                        poster={video.thumbnail}
                        controls
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                    <span className="absolute top-2 right-2 bg-[#2c3e50] text-white px-2 py-1 rounded-md text-sm">
                    {formatDuration(durations[video.id])}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-poppins font-semibold text-lg text-[#2c3e50]">
                        {video.candidateName}
                        {video.verified && (
                          <i
                            className="fas fa-check-circle text-[#3498db] ml-2"
                            title="Verified"
                          ></i>
                        )}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-[#f1c40f] mr-1">
                          <i className="fas fa-star"></i>
                        </span>
                        <span className="text-[#2c3e50]">{video.rating}</span>
                      </div>
                    </div>
                    <p className="text-[#6c757d]">{video.role}</p>
                    <p className="text-[#6c757d] text-sm mb-2">
                      {video.location} · {video.industry}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#e9ecef] px-2 py-1 rounded-md text-sm text-[#495057]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {video.aiKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="bg-[#d1ecf1] px-2 py-1 rounded-md text-sm text-[#0c5460]"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <p className="text-[#6c757d] italic mb-4">
                      "{video.aiCaption}"
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          // (window.location.href = `/profile/${video.id}`)
                          navigate(`/recruiter/jobseeker/${video.id}`)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-[#9b59b6] text-white rounded-full hover:bg-[#8e44ad]"
                        title="View Profile"
                      >
                        <FaUser />
                      </button>
                      <button
                        onClick={() => handleShare(video)}
                        className="w-8 h-8 flex items-center justify-center bg-[#7f8c8d] text-white rounded-full hover:bg-[#95a5a6]"
                        title="Share"
                      >
                        <FaShareAlt />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCandidate(video);
                          setShowNoteModal(true);
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-[#2ecc71] text-white rounded-full hover:bg-[#27ae60]"
                        title="Add Notes"
                      >
                        <FaStickyNote />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#f8f9fa]">
            <FaChevronLeft className="text-[#2c3e50]" />
          </button>
          <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#f8f9fa]">
            <FaChevronRight className="text-[#2c3e50]" />
          </button>
        </div>

        <div
          className="mt-8 p-6 bg-white rounded-xl shadow-lg"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const video = JSON.parse(e.dataTransfer.getData("video"));
            if (!selectedCandidates.find((c) => c.id === video.id)) {
              setSelectedCandidates([...selectedCandidates, video]);
            }
          }}
        >
          <h2 className="text-xl font-poppins font-semibold mb-4">
            Selected Candidates
          </h2>
          {selectedCandidates.length === 0 ? (
            <div className="border-2 border-dashed border-[#e0e0e0] rounded-lg p-8 text-center text-[#6c757d]">
              Drag candidates here to create your shortlist
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCandidates.map((video, index) => (
                <div
                  key={video.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("index", index.toString());
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const dragIndex = parseInt(e.dataTransfer.getData("index"));
                    const dropIndex = index;
                    const newList = [...selectedCandidates];
                    const [removed] = newList.splice(dragIndex, 1);
                    newList.splice(dropIndex, 0, removed);
                    setSelectedCandidates(newList);
                  }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-move relative hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <div className="aspect-video bg-[#e9ecef]">
                      <video
                        className="w-full h-full object-cover"
                        poster={video.thumbnail}
                        controls
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCandidates(
                          selectedCandidates.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-[#e74c3c] text-white rounded-full flex items-center justify-center hover:bg-[#c0392b]"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-poppins font-semibold text-lg text-[#2c3e50]">
                      {video.candidateName}
                    </h3>
                    <p className="text-[#6c757d]">{video.role}</p>
                    <p className="text-[#6c757d] text-sm">
                      {video.location} · {video.industry}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-poppins font-semibold mb-4">
              Notes for {selectedCandidate?.candidateName}
            </h3>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] resize-none mb-4"
              rows="4"
              defaultValue={candidateNotes[selectedCandidate?.id] || ""}
              placeholder="Add your notes here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-[#f8f9fa]"
              >
                Cancel
              </button>
              <button
                onClick={(e) =>
                  handleSaveNote(e.target.previousSibling.previousSibling.value)
                }
                className="px-4 py-2 rounded-lg bg-[#3498db] text-white hover:bg-[#2980b9]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function JobSeekersHub() {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [yearsOfExperiences, setYearsOfExperience] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterActiveStatus = (data) => {
    return data.filter(item => item.status === 1);
  };

  const getAllJobSeekers = async () => {
    try {
      const [
        industriesData,
        educationData,
        yearsData,
        skillData,
      ] = await Promise.all([
        fetchIndustrys(),
        fetchEducationLevels(),
        fetchYearsOfExperiences(),
        fetchSkillLevels(),
      ]);


      const res = await getJobseekers()
      setJobSeekers(res.data)
      setIndustries(filterActiveStatus(industriesData.data.data));
      setEducationLevels(filterActiveStatus(educationData.data.data));
      setYearsOfExperience(filterActiveStatus(yearsData.data.data));
      setSkillLevels(filterActiveStatus(skillData.data.data));
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllJobSeekers()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FadeLoader />
        <p>Loading...</p>
      </div>
    )
  }

  const sampleVideos = jobSeekers.map((jobSeeker) => {


    return {
      id: jobSeeker.id,
      candidateName: jobSeeker.name,
      role: jobSeeker.JobSeeker?.professionalTitle,
      videoUrl: jobSeeker.JobSeeker?.videoUrl ? getImageUrl(jobSeeker.JobSeeker?.videoUrl) : "",
      thumbnail: jobSeeker.avatar ? getImageUrl(jobSeeker.avatar) : "",
      tags: jobSeeker.JobseekerSkills.map((skill) => skill.Skill.name),
      aiKeywords: jobSeeker.JobSeeker?.videoAnalysis ? JSON.parse(jobSeeker.JobSeeker?.videoAnalysis)["keywords and expertise"] : [],
      aiCaption: jobSeeker.JobSeeker?.videoAnalysis ? JSON.parse(jobSeeker.JobSeeker?.videoAnalysis).analysis : "",
      industry: jobSeeker.JobSeeker?.Industry ? jobSeeker.JobSeeker?.Industry.name : "",
      experienceLevel: jobSeeker.JobSeeker?.YearsOfExperience ? jobSeeker.JobSeeker?.YearsOfExperience.name : "",
      certificates: [],
      location: `${jobSeeker.JobSeeker ? jobSeeker.JobSeeker?.city : ""}, ${jobSeeker.JobSeeker ? jobSeeker.JobSeeker?.state : ""}`,
      verified: jobSeeker.isVerified,
      rating: 4.8,
    };
  });


  const sampleJobs = [
    { id: 1, title: "Senior Frontend Developer" },
    { id: 2, title: "UX/UI Designer" },
    { id: 3, title: "Marketing Manager" },
  ];

  return <MainComponent
    videos={sampleVideos}
    jobs={sampleJobs}
    industries={industries}
    educationLevels={educationLevels}
    yearsOfExperiences={yearsOfExperiences}
    skillLevels={skillLevels}

  />;
}


export default JobSeekersHub;

// const sampleVideos = [
//   {
//     id: 1,
//     candidateName: "Sarah Johnson",
//     role: "Senior Software Engineer",
//     videoUrl: "/videos/sarah-interview.mp4",
//     thumbnail: "/thumbnails/sarah.jpg",
//     tags: ["technical", "senior", "leadership"],
//     aiKeywords: ["problem-solving", "system design", "team management"],
//     aiCaption:
//       "Strong technical leader with expertise in distributed systems and team mentoring",
//     industry: "tech",
//     experienceLevel: "senior",
//     certificates: ["aws"],
//     location: "us-west",
//     verified: true,
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     candidateName: "Michael Chen",
//     role: "UX Designer",
//     videoUrl: "/videos/michael-interview.mp4",
//     thumbnail: "/thumbnails/michael.jpg",
//     tags: ["creative", "technical"],
//     aiKeywords: ["user experience", "design thinking", "prototyping"],
//     aiCaption:
//       "Creative UX designer with a focus on user-centered design and prototyping",
//     industry: "tech",
//     experienceLevel: "mid",
//     certificates: ["scrum"],
//     location: "remote",
//     verified: true,
//     rating: 4.2,
//   },
//   {
//     id: 3,
//     candidateName: "Emily Rodriguez",
//     role: "Marketing Coordinator",
//     videoUrl: "/videos/emily-interview.mp4",
//     thumbnail: "/thumbnails/emily.jpg",
//     tags: ["entry-level", "creative"],
//     aiKeywords: ["content creation", "social media", "branding"],
//     aiCaption:
//       "Dynamic marketing coordinator skilled in content creation and social media strategies",
//     industry: "education",
//     experienceLevel: "entry",
//     certificates: [],
//     location: "us-east",
//     verified: false,
//     rating: 3.9,
//   },
// ];