import React, { useState, useEffect } from "react";
import {
  fetchEducationLevels,
  createEducationLevel,
  updateEducationLevel,
  deleteEducationLevel,
  toggleEducationLevelStatus,
} from "@/services/api/api";

import EducationLevelModal from "@/components/admin/EducationLevelModal";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
} from "react-icons/fa";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";

const EducationLevel = () => {
  const [educationLevels, seteducationLevels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducationLevel, setEditingEducationalLevel] = useState(null);

  const getEducationLevels = async () => {
    try {
      setLoading(true);
      const data = await fetchEducationLevels();
      seteducationLevels(data.data.data); 
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEducationLevels();
  }, []);

  const handleOpenModal = (educationLevel = null) => {
    setEditingEducationalLevel(educationLevel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingEducationalLevel(null);
    setIsModalOpen(false);
  };

  const handleSubmitEducationLevel = async (formData) => {
    try {
      if (editingEducationLevel) {
        await updateEducationLevel(editingEducationLevel.id, formData); 
        SuccessToast("Record updated successfully.")
      } else {
        await createEducationLevel(formData);
        SuccessToast("Record created successfully.")
      }
      handleCloseModal();
      await getEducationLevels();
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this education level?")
    ) {
      try {
        await deleteEducationLevel(id);
        await getEducationLevels();
        SuccessToast("Record deleted successfully.")
      } catch (err) {
        ErrorToast("An error occurred please try again later.");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${currentStatus ? "deactivate" : "activate"
      } this Industry?`
    );

    if (!confirmation) {
      return;
    }

    try {
      await toggleEducationLevelStatus(id, { status: currentStatus ? 0 : 1 });
      await getEducationLevels();
      SuccessToast("Status changed successfully.")
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
    }
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Education Levels
          </h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Create Education Levels
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : !educationLevels || educationLevels.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">
                No Education Levels found.
              </p>
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
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {educationLevels.map((educationLevel) => (
                    <tr key={educationLevel.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {educationLevel.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {educationLevel.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${educationLevel.status
                            ? "text-green-900"
                            : "text-red-900"
                            } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${educationLevel.status
                              ? "bg-green-200"
                              : "bg-red-200"
                              } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {educationLevel.status ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleOpenModal(educationLevel)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(educationLevel.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleToggleStatus(
                                educationLevel.id,
                                educationLevel.status
                              )
                            }
                            className={`${educationLevel.status
                              ? "text-green-600 hover:text-green-900"
                              : "text-red-600 hover:text-red-900"
                              }`}
                          >
                            {educationLevel.status ? (
                              <FaToggleOn size={18} />
                            ) : (
                              <FaToggleOff size={18} />
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
      <EducationLevelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEducationLevel}
        educationLevel={editingEducationLevel}
      />
    </div>
  );
};

export default EducationLevel;
