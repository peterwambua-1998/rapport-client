import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const EmailConfigurationModal = ({ isOpen, onClose, onSubmit, emailConfiguration }) => {
  const [formData, setFormData] = useState({
    host: "",
    port: "",
    secure: true,
    user: "",
    password: "",
    from: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailConfiguration) {
      setFormData(emailConfiguration);
    } else {
      setFormData({
        host: "",
        port: "",
        secure: true,
        user: "",
        password: "",
        from: "",
      });
    }
  }, [emailConfiguration]);

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
            {emailConfiguration ? "Edit Email Configuration" : "Add New Email Configuration"}
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
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="Host"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="number"
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="Port"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="User"
              className="mt-2 p-2 w-full border rounded"
              required
            />

            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="email"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="From"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <PulseLoader size={8} color="#ffffff" /> : (emailConfiguration ? "Update Email Configuration" : "Add Email Configuration")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailConfigurationModal;
