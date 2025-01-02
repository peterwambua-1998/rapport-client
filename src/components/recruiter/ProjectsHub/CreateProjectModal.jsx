import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const CreateProjectModal = ({ isOpen, onClose, onSubmit, project, loading, setLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {project ? "Edit Project" : "Add New Project"}
          </h3>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Project Title"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-2 p-2 w-full border rounded"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
            >
              {project ? "Update Project" : loading ? <PulseLoader size={8} color="#ffffff" />: "Add Project"}
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default CreateProjectModal;
