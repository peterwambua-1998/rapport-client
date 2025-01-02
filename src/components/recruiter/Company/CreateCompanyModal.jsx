import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CreateCompanyModal = ({ isOpen, onClose, onSubmit, company }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        description: company.description || "",
        image: company.logo || null,
      });
      setLogoPreview(company.logo || null);
    } else {
      setFormData({
        name: "",
        description: "",
        logo: null,
      });
      setLogoPreview(null);
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.name || !formData.description) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData); 
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {company.length >0 ? "Edit Company" : "Add New Company"}
          </h3>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>

          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Company Name"
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
            <div className="mt-2">
              <label className="block text-left mb-1 text-gray-600">
                Upload Logo
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 w-full border rounded"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
              disabled={loading}
            >
              {loading ? "Saving..." : company.length > 0  ? "Update Company" : "Add Company"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyModal;
