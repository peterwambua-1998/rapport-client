import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateProjectModal from "../../components/recruiter/ProjectsHub/CreateProjectModal";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/api/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import ErrorToast from "@/components/toasts/error";


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  const handleSubmitProject = async (formData) => {
    try {
      setLoading(true)
      if (editingProject) {
        await updateProject(editingProject.id, formData);
      } else {
        await createProject(formData);
      }

      await fetchProjects();
      // setLoading(false)
      handleCloseModal();
    } catch (err) {
      setError(err.message);
      setLoading(false)
      ErrorToast(err?.message || "Error occurred please refresh and try again.")
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Project?")) {
      try {
        await deleteProject(id);
        await getProjects();
      } catch (err) {
        ErrorToast(err?.message || "Error occurred please refresh and try again.")
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleIndustryStatus(id, !currentStatus);
      await getIndustrys();
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  // projects
  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-bold mb-6 text-gray-800">
          Recruitment Projects
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projects Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent>
              <h2 className="text-base lg:text-lg font-bold pt-4">Projects</h2>
              <ul className="space-y-2">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className={`cursor-pointer flex justify-between p-2 rounded-md ${selectedProject?.id === project.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-blue-200"
                      }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <span className="text-sm lg:text-base">{project.name}</span>
                    {/* <Button onClick={() => navigate(`/recruiter/project-details/${project.id}`)} className="text-sm lg:text-base">Details</Button> */}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Selected Project Details */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <Card className="flex-grow">
            <CardContent className="flex pt-4 h-full">
              {selectedProject ? (
                <div>
                  <h2 className="text-base lg:text-lg font-bold">
                    {selectedProject.name}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {selectedProject.ShortlistedCandidates.map((candidate, index) => (
                      <li
                        key={index}
                        className="text-sm lg:text-base text-gray-600"
                      >
                        {candidate.User.name} - {candidate.User.email}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-gray-500 text-center flex flex-col gap-2 justify-center items-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-12 h-12 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h11m4 0h3M4 6h16M4 14h16M5 18h14"
                    />
                  </svg>
                  <p className="text-sm lg:text-base">
                    Select a project to view candidates
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base lg:text-lg font-medium">
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={
                selectedProject
                  ? selectedProject.Schedules.map((date) => ({
                    title: `${selectedProject.name} Interview`,
                    date: date.InterviewDate,
                  }))
                  : []
              }
              height="auto"
              className="rounded-md border text-xs md:text-sm lg:text-base"
            />
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="h-[140vh] overflow-y-scroll">
          <CardHeader>
            <CardTitle className="text-base lg:text-lg font-medium">
              Project Notes
            </CardTitle>
          </CardHeader>
          <CardContent >
            {selectedProject ? (
              selectedProject.Schedules.map((sh) => (
                <Textarea
                  value={sh.Note}
                  placeholder="Add general project notes here..."
                  className="w-full border rounded-md mb-2 p-2 text-sm lg:text-base"
                  readOnly
                />
              ))
            ) : (
              <Textarea
                placeholder="Select a project to see notes..."
                className="w-full border rounded-md p-2 text-sm lg:text-base"
                readOnly
              />
            )}
          </CardContent>
        </Card>
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProject}
        industry={editingProject}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Projects;
