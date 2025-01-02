import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; 
import { PulseLoader } from "react-spinners";
const YearsOfExperienceModal = ({ isOpen, onClose, onSubmit, yearsOfExperience }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "", 
  });
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (yearsOfExperience) {
      setFormData(yearsOfExperience);
    } else {
      setFormData({
        name: "",
        description: "", 
      });
    }
  }, [yearsOfExperience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    await onSubmit(formData);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {yearsOfExperience ? "Edit Years of Experience" : "Add New Years of Experience"}
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
              placeholder="Years of Experience Name"
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
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <PulseLoader size={8} color="#ffffff" /> : (yearsOfExperience ? "Update Years of Experience" : "Add Years of Experience")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default YearsOfExperienceModal;
