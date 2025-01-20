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
    <div className="p-4">
      <p className="text-xl">Coming soon</p>
    </div>
  );
};

export default JobMatches;
