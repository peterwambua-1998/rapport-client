import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Update import path to match your ShadCN setup

const ProjectCard = ({ project }) => {
  const { name, description, Schedules, User } = project;

  // Safeguard for empty schedules
  const schedule = Schedules[0] || {};

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 truncate">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Recruiter Name */}
        <div>
          <span className="font-medium text-gray-700">Recruiter: </span>
          <span className="text-gray-800">{User.name}</span>
        </div>
        {/* Interview Date */}
        <div>
          <span className="font-medium text-gray-700">Interview Date: </span>
          <span className="text-gray-800">
            {new Date(schedule.InterviewDate).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        {/* Status */}
        <div>
          <span
            className={`px-2 py-1 rounded ${
              schedule.Status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {schedule.Status}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
