import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Briefcase, MapPin, Github, Calendar, School, Award, Mail,
  Linkedin, Globe, ChevronDown, Star, Users, Eye, Trophy,
  GraduationCap, BookOpen, CheckCircle, Timer
} from 'lucide-react';

const JobMatches = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const data = {
    "Name": "Peter Wambua",
    "Email": "pwambua25@gmail.com",
    "AboutMe": "I am a reliable, hardworking, self-driven individual in the final year in the field of Information and Technology in the school of Business at University Of Nairobi. I am looking to work and succeed in an environment of growth and excellence and develop a career which provides me with both job satisfaction and self-development and at the same time help in the achievement of organizational goals as well as personal goals effectively.",
    "ProfessionalTitle": "software engineer",
    "Location": "Nairobi, Kenya",
    "Industry": "Information Technology",
    "videoUrl": "uploads\\videos\\video-1738670958823.mp4",
    "videoUploadDate": "2025-02-04T12:09:18.976Z",
    "profilePhotoUrl": "uploads\\images\\profilePicture-1738256753113.jpeg",
    "YearsofExperience": 2,
    "CurrentRole": "Senior developer",
    "Company": "Projtrac",
    "LinkedInProfileUrl": "https://github.com/peterwambua-1998",
    "PortfolioUrl": "https://github.com/peterwambua-1998",
    "GithubUrl": "https://github.com/peterwambua-1998",
    "videoAnalysis": {
      "pastExperience": [
        {
          "position": "Software Engineer",
          "employer": "Google",
          "description": "null",
          "startDate": "2022-01-01T00:00:00.000Z",
          "endDate": "2023-02-01T00:00:00.000Z"
        }
      ],
      "softSkills": [
        {
          "name": "communication",
          "proficiency": "intermediate"
        },
        {
          "name": "leadership",
          "proficiency": "intermediate"
        }
      ],
      "technicalSkills": [
        {
          "name": "reactions",
          "proficiency": "intermediate"
        }
      ],
      "careerGoals": [
        {
          "name": "Become a Senior Software Engineer in the next five years"
        }
      ],
      "summary": "Peter is a software engineer with experience at Google. He is looking to become a senior software engineer in the next five years. He has strong communication and leadership skills.",
      "highlights": [
        "Peter has experience as a Software Engineer at Google.",
        "He is looking to become a Senior Software Engineer in the next five years.",
        "He has strong communication and leadership skills."
      ],
      "recommendations": [
        "Peter should highlight his experience at Google and his career goals in his resume and cover letter.",
        "He should also emphasize his communication and leadership skills.",
        "Peter should consider taking courses or certifications to further develop his technical skills and prepare for a senior software engineer role."
      ]
    },
    "testimonials": [],
    "preference": {
      "id": 2,
      "userId": "fceed2b0-881d-49cd-9378-93deec0a4429",
      "profileVisible": true,
      "activeStatus": true,
      "bgColor": "#47664d",
      "skills": false,
      "education": false,
      "experience": false,
      "profInfo": false,
      "careerGoals": true,
      "recruiterViewsProfile": true,
      "releases": false,
      "promotions": true,
      "createdAt": "2025-01-31T18:38:41.610Z",
      "updatedAt": "2025-02-01T13:01:20.663Z"
    },
    "stats": {
      "profileViews": 0,
      "searchAppearance": 0,
      "interviewsCompleted": 3,
      "challengesCompleted": 0,
      "daysOnPlatform": 12
    },
    "Education": [
      {
        "school": "University Of Nairobi",
        "degree": "Diploma",
        "major": "Purchasing and Supplies Management",
        "startDate": "Jan 2017",
        "endDate": "Jan 2018"
      },
      {
        "school": "Machakos Boys High School",
        "degree": "Kenya Certificate of Secondary Education",
        "major": null,
        "startDate": "Jan 2013",
        "endDate": "Jan 2016"
      },
      {
        "school": "Thomas Burke Primary school",
        "degree": "Kenya Certificate of Primary Education",
        "major": null,
        "startDate": "Jan 2011",
        "endDate": "Jan 2012"
      }
    ],
    "WorkExperience": [
      {
        "position": "Developer",
        "employer": "Zulten-WS",
        "description": "Created system for school to manage results, Point of sale system for a client, Website for a clothing manufacturers, HIS for WANINI KIRERI MAGEREZA HOSPITAL.",
        "startDate": "Jan 2020",
        "endDate": "Jun 2021",
        "currentlyWorking": false
      },
      {
        "position": "Developer",
        "employer": "ProjTrac",
        "description": "Developed a system for a school to manage transport activities like monitoring vehicle location and its geofence.",
        "startDate": "Apr 2022",
        "endDate": "Dec 2022",
        "currentlyWorking": false
      }
    ],
    "Certifications": [
      {
        "name": "AWS Certified",
        "organization": "Amazon web  services"
      }
    ],
    "Skills": [
      {
        "name": "Microsoft Word",
        "proficiency": "advanced",
        "updatedAt": "2025-01-30T17:07:13.696Z"
      },
      {
        "name": "Microsoft Excel",
        "proficiency": "advanced",
        "updatedAt": "2025-01-30T17:07:13.696Z"
      },
      {
        "name": "Microsoft Power Point",
        "proficiency": "advanced",
        "updatedAt": "2025-01-30T17:07:13.697Z"
      },
      {
        "name": "Microsoft Outlook",
        "proficiency": "advanced",
        "updatedAt": "2025-01-30T17:07:13.696Z"
      },
      {
        "name": "C++",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.697Z"
      },
      {
        "name": "HTML",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.697Z"
      },
      {
        "name": "CSS",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.698Z"
      },
      {
        "name": "PHP",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.698Z"
      },
      {
        "name": "Laravel",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.698Z"
      },
      {
        "name": "Javascript",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.698Z"
      },
      {
        "name": "Jquery",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.698Z"
      },
      {
        "name": "React",
        "proficiency": "intermediate",
        "updatedAt": "2025-01-30T17:07:13.698Z"
      },
      {
        "name": "Networking",
        "proficiency": "beginner",
        "updatedAt": "2025-01-30T17:07:13.698Z"
      }
    ]
  }

  // Skill proficiency to percentage mapping
  const proficiencyMap = {
    beginner: 33,
    intermediate: 66,
    advanced: 100
  };

  // Group skills by proficiency
  const groupedSkills = {
    advanced: [],
    intermediate: [],
    beginner: []
  };

  data.Skills.forEach(skill => {
    groupedSkills[skill.proficiency].push(skill);
  });

  return (
    <div className="min-h-screen bg-[#edeeed] pb-20 ">
      {/* Floating Stats Bar */}
      <div className=" bg-[#2b4033] text-white px-4 py-2 flex justify-around text-sm z-50">
        <div className="flex flex-col items-center">
          <Eye size={16} />
          <span>{data.stats.profileViews}</span>
          <span className="text-xs text-[#acc8ac]">Views</span>
        </div>
        <div className="flex flex-col items-center">
          <Users size={16} />
          <span>{data.stats.searchAppearance}</span>
          <span className="text-xs text-[#acc8ac]">Searches</span>
        </div>
        <div className="flex flex-col items-center">
          <Trophy size={16} />
          <span>{data.stats.interviewsCompleted}</span>
          <span className="text-xs text-[#acc8ac]">Interviews</span>
        </div>
        <div className="flex flex-col items-center">
          <Timer size={16} />
          <span>{data.stats.daysOnPlatform}</span>
          <span className="text-xs text-[#acc8ac]">Days</span>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-b from-[#2b4033] to-[#546154] text-white pt-16 p-6 rounded-b-3xl ">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-full bg-[#acc8ac] flex items-center justify-center text-3xl font-bold text-[#2b4033] border-4 border-[#dce2d4] shadow-xl">
            {data.Name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.Name}</h1>
            <p className="text-[#dce2d4] font-medium">{data.ProfessionalTitle}</p>
            {/* <div className="flex gap-2 mt-2">
              <Badge className="bg-[#acc8ac] text-[#2b4033] hover:bg-[#94a49c]">
                {data.YearsofExperience}+ Years
              </Badge>
              <Badge className="bg-[#dce2d4] text-[#2b4033] hover:bg-[#94a49c]">
                AWS Certified
              </Badge>
            </div> */}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex gap-2 items-center text-[#dce2d4]">
            <MapPin size={16} />
            <span>{data.Location}</span>
          </div>
          <div className="flex gap-2 items-center text-[#dce2d4]">
            <Briefcase size={16} />
            <span>{data.CurrentRole} at {data.Company}</span>
          </div>
          <div className="flex gap-2 items-center text-[#dce2d4]">
            <Mail size={16} />
            <span>{data.Email}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-3 mb-14">
          {data.GithubUrl && (
            <a href={data.GithubUrl} target="_blank" rel="noopener noreferrer"
              className="bg-[#acc8ac] text-[#2b4033] p-2 rounded-full hover:bg-[#94a49c] transition-colors">
              <Github size={20} />
            </a>
          )}
          {data.LinkedInProfileUrl && (
            <a href={data.LinkedInProfileUrl} target="_blank" rel="noopener noreferrer"
              className="bg-[#acc8ac] text-[#2b4033] p-2 rounded-full hover:bg-[#94a49c] transition-colors">
              <Linkedin size={20} />
            </a>
          )}
          {data.PortfolioUrl && (
            <a href={data.PortfolioUrl} target="_blank" rel="noopener noreferrer"
              className="bg-[#acc8ac] text-[#2b4033] p-2 rounded-full hover:bg-[#94a49c] transition-colors">
              <Globe size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 -mt-16">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid grid-cols-4 bg-white rounded-xl  mx-2 p-4">
            <TabsTrigger value="about" className="data-[state=active]:bg-[#acc8ac]">
              <Users size={16} />
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-[#acc8ac]">
              <Star size={16} />
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-[#acc8ac]">
              <Briefcase size={16} />
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-[#acc8ac]">
              <GraduationCap size={16} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card className="mt-8 bg-white  border-none">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-[#2b4033] mb-2">About Me</h2>
                <p className="text-[#546154] leading-relaxed">
                  {isExpanded ? data.AboutMe : `${data.AboutMe.slice(0, 150)}...`}
                </p>
                {data.AboutMe.length > 150 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#2b4033] mt-2 flex items-center gap-1 hover:text-[#546154]"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                    <ChevronDown className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={16} />
                  </button>
                )}
              </CardContent>
            </Card>

            {/* Video Analysis Summary */}
            {data.videoAnalysis && (
              <Card className="mt-4 bg-white  border-none">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-[#2b4033] mb-3">Career Highlights</h2>
                  {data.videoAnalysis.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <CheckCircle className="text-[#acc8ac] mt-1" size={16} />
                      <p className="text-[#546154]">{highlight}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-4 mt-4">
              {Object.entries(groupedSkills).map(([proficiency, skills]) =>
                skills.length > 0 && (
                  <Card key={proficiency} className="bg-white  border-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-[#2b4033] capitalize mb-3">
                        {proficiency} Skills
                      </h3>
                      <div className="space-y-4">
                        {skills.map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#546154] font-medium">{skill.name}</span>
                              <span className="text-[#94a49c]">{proficiency}</span>
                            </div>
                            <Progress value={proficiencyMap[skill.proficiency]}
                              className="h-2 bg-[#dce2d4]"
                              indicatorClassName="bg-[#2b4033]" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="experience">
            <div className="space-y-4 mt-4">
              {data.WorkExperience.map((exp, index) => (
                <Card key={index} className="bg-white  border-none">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#acc8ac] p-2 rounded-lg">
                        <Briefcase className="text-[#2b4033]" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#2b4033]">{exp.position}</h3>
                        <p className="text-[#546154] font-medium">{exp.employer}</p>
                        <div className="flex items-center gap-2 text-sm text-[#94a49c] mt-1">
                          <Calendar size={14} />
                          <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        {exp.description && (
                          <p className="mt-2 text-[#546154] text-sm">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="space-y-4 mt-4">
              {data.Education.map((edu, index) => (
                <Card key={index} className="bg-white  border-none">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#acc8ac] p-2 rounded-lg">
                        <School className="text-[#2b4033]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#2b4033]">{edu.school}</h3>
                        <p className="text-[#546154]">{edu.degree}</p>
                        {edu.major && (
                          <p className="text-[#546154] text-sm">{edu.major}</p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-[#94a49c] mt-1">
                          <Calendar size={14} />
                          <span>{edu.startDate} - {edu.endDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Certifications */}
              {data.Certifications && data.Certifications.length > 0 && (
                <Card className="bg-white  border-none">
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-[#2b4033] mb-3">Certifications</h2>
                    {data.Certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-3 mb-3 last:mb-0">
                        <Award className="text-[#acc8ac]" size={20} />
                        <div>
                          <h3 className="font-medium text-[#2b4033]">{cert.name}</h3>
                          <p className="text-[#546154] text-sm">{cert.organization}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default JobMatches;