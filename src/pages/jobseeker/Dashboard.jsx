
import React, { useState } from 'react';
import { Edit, Rocket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import useAuth from '@/hooks/useAuth';
import { FadeLoader } from 'react-spinners';
import { getImageUrl } from '@/services/helpers/helpers';
import { useNavigate } from 'react-router-dom';
import avatar from '@/assets/profile.jpg'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Engineering Director at Tech Solutions Inc",
      relation: "Former Manager",
      date: "2024-02-15",
      time: "2:15",
      status: "Approved",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Developer at Tech Innovations Inc",
      relation: "Team Member",
      date: "2024-02-10",
      time: "1:45",
      status: "Approved",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emily Watson",
      role: "Product Owner at Digital Ventures",
      relation: "Project Collaborator",
      date: "2024-02-01",
      time: "2:30",
      status: "Pending",
      image: "https://via.placeholder.com/150",
    },
  ];

  const user_role = user.role == "job_seeker" ? "jobseeker" : user.role;
  const userAvatar = user?.linkedProfile?.picture ?? (user?.avatar ? getImageUrl(user.avatar) : avatar);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FadeLoader />
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#e4edfe] via-[#edf1ff] to-[#f1eeff] min-h-screen p-6">

      <div className='max-w-5xl mx-auto'>
        <div className='w-6 h-6'>
          <FaEnvelope className='w-full h-full text-2xl text-gray-700' />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <div className="bg-black/90 h-[60vh] w-full"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-2 px-4">
            <div>
            <span>Uploaded: 2024-01-15</span>
            <span className="float-right">Last viewed: 2024-03-20</span>
            </div>
            <p className='text-yellow-300 text-sm'>Consider updating your video to keep your profile current</p>
          </div>
        </div>
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold flex items-center">
            John Smith
            <span className="ml-2 text-blue-500">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM7 10l2.5 2.5L17 6l1.5 1.5L9.5 17 6 13.5z" />
              </svg>
            </span>
          </h1>
          <div className="flex gap-4">
            <button onClick={() => navigate('/jobseeker/profile')} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
              <Rocket className="w-4 h-4" /> Promote Profile
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Interviews */}
            <div>
              <h2 className="text-xl font-bold mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg shadow">
                  <h3 className="font-bold">Senior Software Engineer</h3>
                  <p>Tech Corp Inc.</p>
                  <p className="text-sm text-gray-500">2024-01-25 at 14:00</p>
                </div>
                <div className="p-4 border rounded-lg shadow">
                  <h3 className="font-bold">Product Manager</h3>
                  <p>Innovation Labs</p>
                  <p className="text-sm text-gray-500">2024-01-28 at 10:00</p>
                </div>
              </div>
            </div>
            {/* Platform Activity */}
            <div>
              <h2 className="text-xl font-bold mb-4">Platform Activity</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500">Applications Submitted</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg shadow text-center">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-500">Interviews Completed</p>
                </div>
                <div className="p-4 bg-purple-100 rounded-lg shadow text-center">
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-gray-500">Profile Completion</p>
                </div>
              </div>
            </div>
          </div>
          {/* Interview History */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Interview History</h2>
            <div className="p-4 border rounded-lg shadow">
              <h3 className="font-bold">Senior Software Engineer</h3>
              <p>Tech Corp Inc.</p>
              <p className="text-sm text-yellow-500">In Progress</p>
              <p className="text-sm text-gray-500">Interviewed on Jan 15, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* AI Summary and Profile Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <h2 className="text-xl font-bold mb-4">AI Summary</h2>
            <p className="text-sm text-gray-700 mb-4">
              Based on video analysis, John demonstrates strong leadership
              capabilities with 5+ years of team management experience.
              Technical proficiency includes advanced project management tools
              and data analysis. Notable soft skills include exceptional
              communication, conflict resolution, and mentoring abilities.
              Shows particular strength in strategic planning and
              cross-functional team collaboration.
            </p>
            <h3 className="text-lg font-semibold mb-2">Profile Analytics</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <span>Profile Completion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>Search Visibility</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Highlights</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Strong leadership presence and confident communication style</li>
              <li>Clear articulation of complex technical concepts</li>
              <li>Engaging storytelling ability when describing past experiences</li>
              <li>Professional appearance and presentation skills</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              AI Recommendations: These are areas for improvement
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Consider adding specific metrics to quantify your achievements</li>
              <li>Include more examples of cross-functional leadership</li>
              <li>Highlight your technical expertise more prominently</li>
              <li>Add recent industry certifications or training</li>
            </ul>
          </div>
          {/* Skills & Challenges */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Skills & Challenges: Show off your skills
            </h2>
            <button className="text-sm text-blue-500 mb-4">Add New Skill</button>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-bold">Leadership</h3>
                  <p className="text-sm text-gray-500">
                    12 challenges completed
                  </p>
                </div>
                <span className="text-sm text-purple-500 bg-purple-100 px-2 py-1 rounded">
                  Expert
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-bold">Communication</h3>
                  <p className="text-sm text-gray-500">
                    8 challenges completed
                  </p>
                </div>
                <span className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded">
                  Advanced
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-bold">Problem Solving</h3>
                  <p className="text-sm text-gray-500">
                    5 challenges completed
                  </p>
                </div>
                <span className="text-sm text-green-500 bg-green-100 px-2 py-1 rounded">
                  Intermediate
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-bold">Project Management</h3>
                  <p className="text-sm text-gray-500">
                    3 challenges completed
                  </p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Beginner
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mt-6 mb-4">Available Challenges</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <p className="text-sm text-gray-700">
                  Present a technical concept to non-technical stakeholders
                </p>
                <span className="text-yellow-500">→</span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <p className="text-sm text-gray-700">
                  Resolve a team conflict scenario
                </p>
                <span className="text-yellow-500">→</span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <p className="text-sm text-gray-700">
                  Create a project timeline and resource allocation plan
                </p>
                <span className="text-yellow-500">→</span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <p className="text-sm text-gray-700">
                  Demonstrate active listening in a mock client meeting
                </p>
                <span className="text-yellow-500">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Practice Questions */}
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Practice Questions</h2>
            <button className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.5-4.5M3.5 20.5L9 15m-6 0a2.5 2.5 0 103.5-3.5m-3.5 0H9"
                />
              </svg>
              Get Interview Coaching
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Question Card */}
            <div className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-yellow-500 bg-yellow-100 px-2 py-1 rounded">
                  Medium
                </span>
                <span className="text-sm text-gray-500">Leadership</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                How do you handle conflicts within your team?
              </h3>
              <button className="text-sm text-purple-500">Practice Now</button>
            </div>
            <div className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded">
                  Hard
                </span>
                <span className="text-sm text-gray-500">Product Strategy</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                Describe a time you had to pivot product strategy based on user
                feedback.
              </h3>
              <button className="text-sm text-purple-500">Practice Now</button>
            </div>
            <div className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-yellow-500 bg-yellow-100 px-2 py-1 rounded">
                  Medium
                </span>
                <span className="text-sm text-gray-500">Analytics</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                What metrics do you use to measure product success?
              </h3>
              <button className="text-sm text-purple-500">Practice Now</button>
            </div>
            <div className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded">
                  Hard
                </span>
                <span className="text-sm text-gray-500">Product Management</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                How do you prioritize features in your product roadmap?
              </h3>
              <button className="text-sm text-purple-500">Practice Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Professional Information */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p>
                <span className="text-sm text-gray-500">Location</span>
                <br />
                New York, NY
              </p>
              <p className="mt-4">
                <span className="text-sm text-gray-500">Industry</span>
                <br />
                Technology
              </p>
              <p className="mt-4">
                <span className="text-sm text-gray-500">Years of Experience</span>
                <br />
                8
              </p>
              <p className="mt-4">
                <span className="text-sm text-gray-500">Education</span>
                <br />
                MBA - Business Administration
              </p>
            </div>
            <div>
              <p>
                <span className="text-sm text-gray-500">Current Role</span>
                <br />
                Senior Product Manager
              </p>
              <p className="mt-4">
                <span className="text-sm text-gray-500">Company</span>
                <br />
                Tech Innovations Inc
              </p>
              <p className="mt-4">
                <span className="text-sm text-gray-500">LinkedIn</span>
                <br />
                linkedin.com/in/johnsmith
              </p>
              <p className="mt-4">
                <span className="text-sm text-gray-500">Portfolio</span>
                <br />
                johnsmith.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* LinkedIn Profile */}
        <div className="p-6">
          <div className="flex gap-4 items-center mb-6">
            <h2 className="text-xl font-bold">LinkedIn Profile</h2>
            <FaLinkedin className='text-blue-600' />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Experience</h3>
              <div className="mb-6">
                <h4 className="font-bold">Senior Product Manager</h4>
                <p className="text-sm text-gray-500">
                  Tech Innovations Inc • 2021 - Present
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Leading product strategy and development for enterprise SaaS
                  solutions. Managing a team of 12 across product, design, and
                  engineering.
                </p>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                  <li>Launched 3 major product features increasing revenue by 40%</li>
                  <li>
                    Reduced customer churn by 25% through strategic product
                    improvements
                  </li>
                  <li>
                    Led cross-functional team of 20+ members across 3 continents
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Product Manager</h4>
                <p className="text-sm text-gray-500">
                  Digital Solutions Co • 2018 - 2021
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Managed full product lifecycle for B2B software platform.
                </p>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                  <li>Grew user base from 10k to 100k in 18 months</li>
                  <li>
                    Implemented agile methodologies improving delivery time by
                    35%
                  </li>
                  <li>
                    Secured $2M in additional funding through product success
                  </li>
                </ul>
              </div>
            </div>
            {/* Education & Certifications */}
            <div className='grid grid-cols-1 gap-6'>

              <div className="">
                <h3 className="text-lg font-semibold mb-4">Education</h3>
                <p className="mb-4">
                  <span className="font-semibold">MBA - Business Administration</span>
                  <br />
                  Stanford University • 2018
                </p>
                <p className="mb-4">
                  <span className="font-semibold">BS - Computer Science</span>
                  <br />
                  University of California, Berkeley • 2014
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                <p className="mb-4">
                  Professional Scrum Master (PSM I)
                  <br />
                  Scrum.org • 2023
                </p>
                <p>
                  Product Management Certification
                  <br />
                  Product School • 2022
                </p>
              </div>

              {/* Skills */}
              <div className="">
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                    Product Strategy
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                    Agile Methodologies
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                    Cross-functional Leadership
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                    Data Analytics
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                    User Experience (UX)
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                    Strategic Planning
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                    Team Building
                  </span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Career Goals</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Transition to Director of Product role within 2 years</li>
            <li>
              Build and scale products that impact millions of users
            </li>
            <li>
              Mentor junior product managers and build strong teams
            </li>
            <li>Develop expertise in AI/ML product strategy</li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mt-6 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Video Testimonials</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-sm text-blue-500 flex items-center gap-2">
                  + Request New Testimonial
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request New Testimonial</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testimonial Request
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your testimonial request..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600"
                  >
                    Submit Request
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className=" rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-40 object-cover"
                  />
                  <span
                    className={`absolute top-2 right-2 text-xs px-2 py-1 rounded text-white ${testimonial.status === "Approved"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                      }`}
                  >
                    {testimonial.status}
                  </span>
                  <span className="absolute bottom-2 right-2 text-sm bg-black bg-opacity-50 text-white px-2 rounded">
                    {testimonial.time}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.relation} • Recorded {testimonial.date}
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
