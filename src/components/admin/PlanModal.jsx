import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const PlanModal = ({ isOpen, onClose, onSubmit, plan }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    monthly_price: "",
    yearly_price: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plan) {
      setFormData(plan);
      console.log(plan);
    } else {
      setFormData({
        name: "",
        description: "",
        monthly_price: "",
        yearly_price: "",
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: { ...prevState[parent][child], price: parseFloat(value) },
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
            {plan ? "Edit Plan" : "Add New Plan"}
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
              placeholder="Plan Name"
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
            <input
              type="number"
              name="monthly_price"
              value={formData.monthly_price}
              onChange={handleChange}
              placeholder="Monthly Price"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="number"
              name="yearly_price"
              value={formData.yearly_price}
              onChange={handleChange}
              placeholder="Yearly Price"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
            >
              {plan ? "Update Plan" : "Add Plan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
