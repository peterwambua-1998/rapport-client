import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const EmailTemplateModal = ({ isOpen, onClose, onSubmit, emailTemplate }) => {
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailTemplate) {
      setFormData(emailTemplate);
    } else {
      setFormData({
        type: "",
        subject: "",
        body: "",
      });
    }
  }, [emailTemplate]);

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
      <div className="relative top-10 mx-auto p-8 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            {emailTemplate ? "Edit Email Template" : "Add New Email Template"}
          </h3>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Email Template Type"
              className="mt-4 p-3 w-full border rounded"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Email Template Subject"
              className="mt-4 p-3 w-full border rounded"
              required
            />
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Body"
              className="mt-4 p-3 w-full border rounded"
              rows="8"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <PulseLoader size={8} color="#ffffff" /> : (emailTemplate ? "Update Email Template" : "Add Email Template")}
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default EmailTemplateModal;
