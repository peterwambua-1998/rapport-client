import React, { useState, useEffect } from "react";
import {
  fetchFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
  toggleFeatureStatus,
} from "@/services/api/api";

import FeatureModal from "@/components/admin/FeatureModal";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
} from "react-icons/fa";
const Features = () => {
  const [features, setFeatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);

  const getFeatures = async () => {
    try {
      setLoading(true);
      const data = await fetchFeatures();
      setFeatures(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeatures();
  }, []);

  const handleOpenModal = (feature = null) => {
    setEditingFeature(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingFeature(null);
    setIsModalOpen(false);
  };

  const handleSubmitFeature = async (formData) => {
    try {
      if (editingFeature) {
        await updateFeature(editingFeature.id, formData);
      } else {
        await createFeature(formData);
      }
      handleCloseModal();
      await getFeatures(); // Refresh the features list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      try {
        await deleteFeature(id);
        await getFeatures(); // Refresh the features list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleFeatureStatus(id, !currentStatus);
      await getFeatures(); // Refresh the features list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Features</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Create Feature
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : !features || features.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">No features found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {feature.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {feature.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {feature.type}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {feature.value} {feature.unit}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${feature.isActive ? "text-green-900" : "text-red-900"
                            } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${feature.isActive ? "bg-green-200" : "bg-red-200"
                              } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {feature.isActive ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleOpenModal(feature)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(feature.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() =>
                              handleToggleStatus(feature.id, feature.isActive)
                            }
                            className={`${feature.isActive
                                ? "text-green-600 hover:text-green-900"
                                : "text-red-600 hover:text-red-900"
                              }`}
                          >
                            {feature.isActive ? (
                              <FaToggleOn />
                            ) : (
                              <FaToggleOff />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <FeatureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFeature}
        feature={editingFeature}
      />
    </div>
  );
};

export default Features;
