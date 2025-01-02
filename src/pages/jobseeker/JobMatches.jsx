import React, { useEffect, useState } from "react";
import { getJobseekerProjects } from "@/services/api/api";
import ProjectCard from "./ProjectCard";

const JobMatches = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await getJobseekerProjects();
      if (response.data && response.data.length > 0) {
        setProjects(response.data)
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load projects." });
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden p-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">My Jobs History</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobMatches;
