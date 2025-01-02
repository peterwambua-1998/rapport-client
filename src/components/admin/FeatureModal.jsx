import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { PulseLoader } from "react-spinners";

const FeatureModal = ({ isOpen, onClose, onSubmit, feature }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'boolean',
    value: '',
    unit: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (feature) {
      setFormData(feature);
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'boolean',
        value: '',
        unit: '',
      });
    }
  }, [feature]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
            {feature ? 'Edit Feature' : 'Add New Feature'}
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
              placeholder="Feature Name"
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
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            >
              <option value="boolean">Boolean</option>
              <option value="numeric">Numeric</option>
              <option value="text">Text</option>
            </select>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Value"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Unit (optional)"
              className="mt-2 p-2 w-full border rounded"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
            >
              {feature ? 'Update Feature' : 'Add Feature'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;