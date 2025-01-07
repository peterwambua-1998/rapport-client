import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Star,
  User,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaUserLarge } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../services/helpers/helpers";

import {
  getJobseekers,
  fetchSkills,
  fetchEducationLevels,
  fetchSkillLevels,
  fetchYearsOfExperiences,
  fetchIndustrys,
  getCountries,
} from "../../services/api/api";

const JobSeekersHub = () => {
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const [candidates, setCandidates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [yearsOfExperiences, setYearsOfExperience] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const filterCandidates = (jobseekersData) => {
    return jobseekersData.filter(
      (candidate) =>
        candidate?.JobSeeker?.profileVisible
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          skillsData,
          industriesData,
          educationData,
          yearsData,
          skillData,
          jobseekersData,
          countriesData,
        ] = await Promise.all([
          fetchSkills(),
          fetchIndustrys(),
          fetchEducationLevels(),
          fetchYearsOfExperiences(),
          fetchSkillLevels(),
          getJobseekers(),
          getCountries(),
        ]);

        setSkills(skillsData.data.data);
        setIndustries(industriesData.data.data);
        setEducationLevels(educationData.data.data);
        setYearsOfExperience(yearsData.data.data);
        setSkillLevels(skillData.data.data);
        setCandidates(filterCandidates(jobseekersData.data));
        setCountries(countriesData.data.data);
        setLoading(false)
      } catch (err) {
        setError(true);
        setLoading(false)
        console.error("Error fetching form data:", err);
      }
    };
    fetchData();
  }, []);
  const handleuserClick = (candidate) => {
    return navigate(`/recruiter/jobseeker/${candidate.id}`);
  };

  if (loading) {
    return (
      <div>
        loading
      </div>
    )
  }

  if (error) {
    return (
      <div>
        Failed to load form data. Please refresh the page.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-8 border border-gray-400">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          AI Interview Library
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
          <Textarea
            placeholder="Ask about candidates or job requirements..."
            className="mb-4"
          />
          <Button className="bg-blue-400 text-white">Ask AI</Button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          <div className="">
            <select className="border rounded-lg px-4 py-2 w-full">
              <option>All Industries</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select className="border rounded-lg px-4 py-2 w-full">
              <option>All Experience Levels</option>
              {educationLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select className="border rounded-lg px-4 py-2 w-full">
              <option>All Certificates</option>
              {/* Add certificate options here */}
            </select>
          </div>
          <div className="">
            <select className="border rounded-lg px-4 py-2 w-full">
              <option>All Locations</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select className="border rounded-lg px-4 py-2 w-full">
              <option>All Verification</option>
              {/* Add verification options here */}
            </select>
          </div>
          <div className="">
            <select className="border rounded-lg px-4 py-2 w-full">
              <option>All Ratings</option>
              {/* Add rating options here */}
            </select>
          </div>
        </div>

        {/* Carousel Section with Left and Right Buttons */}
        <div className="relative ">
          {/* Left Button */}
          <Button
            onClick={() => swiperRef.current?.slidePrev()}
            variant="outline"
            className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Candidate Cards */}
          <Swiper
            spaceBetween={50}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mb-8"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {candidates.map((candidate, index) => (
              <SwiperSlide key={index} className="">
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="relative">
                      <video className="w-full rounded-t-lg object-fit: contain" controls>
                        <source
                          src={candidate?.JobSeeker?.videoUrl
                            ? getImageUrl(candidate?.JobSeeker.videoUrl)
                            : "placeholder-video.mp4"}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </CardHeader>
                  <div className="p-4">
                    <CardTitle className="flex justify-between items-center">
                      {candidate.name}
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4" />
                        <span className="ml-1">{candidate.rating}</span>
                      </div>
                    </CardTitle>
                    <CardDescription className="mb-2">
                      {candidate?.JobSeeker?.professionalTitle}
                    </CardDescription>
                    <p className="text-gray-500 text-base">
                      {candidate?.JobSeeker?.state} - {candidate?.JobSeeker?.Industry?.name}
                    </p>
                    <p className="text-gray-500 text-sm">{candidate.location}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {candidate?.JobseekerSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {skill?.Skill?.name}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-600 italic truncate">
                      "{candidate?.JobSeeker?.about}"
                    </p>
                  </div>
                  <CardFooter>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleuserClick(candidate)}
                        size="sm"
                        className="rounded-full h-8 w-8 bg-purple-500"
                      >
                        <FaUserLarge className="w-12 h-12 text-white" />
                      </Button>
                      <Button size="sm" className="rounded-full h-8 w-8 bg-gray-500">
                        <FaShareAlt className="w-12 h-12 text-white" />
                      </Button>
                      <Button size="sm" className="rounded-full h-8 w-8 bg-green-500">
                        <HiDocument className=" text-white" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Button */}
          <Button
            onClick={() => swiperRef.current?.slideNext()}
            variant="outline"
            className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/6 bg-white shadow-md rounded-full p-2 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekersHub;
