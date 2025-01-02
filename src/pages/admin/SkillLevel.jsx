import React, { useState, useEffect } from "react";
import {
  fetchSkillLevels,
  createSkillLevel,
  updateSkillLevel,
  deleteSkillLevel,
  toggleSkillLevelStatus,
} from "@/services/api/api";

import SkillLevelModal from "@/components/admin/SkillLevelModal";
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

const SkillLevel = () => {
  const [skillLevels, setSkillLevels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkillLevel, setEditingSkillLevel] = useState(null);

  const getSkillLevels = async () => {
    try {
      setLoading(true);
      const data = await fetchSkillLevels();
      setSkillLevels(data.data.data);
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSkillLevels();
  }, []);

  const handleOpenModal = (skillLevel = null) => {
    setEditingSkillLevel(skillLevel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingSkillLevel(null);
    setIsModalOpen(false);
  };

  const handleSubmitSkillLevel = async (formData) => {
    try {
      if (editingSkillLevel) {
        await updateSkillLevel(editingSkillLevel.id, formData);
        SuccessToast("Record updated successfully");
      } else {
        await createSkillLevel(formData);
        SuccessToast("Record created successfully");
      }

      handleCloseModal();
      await getSkillLevels();
    } catch (err) {
      ErrorToast("An error occurred please try again later.");

    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill level?")) {
      try {
        await deleteSkillLevel(id);
        await getSkillLevels();
        SuccessToast("Record deleted successfully.")
      } catch (err) {
        ErrorToast("An error occurred please try again later.");

      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${currentStatus ? "deactivate" : "activate"
      } this skill Level?`
    );

    if (!confirmation) {
      return;
    }

    try {
      await toggleSkillLevelStatus(id, { status: currentStatus ? 0 : 1 });
      await getSkillLevels();
      SuccessToast("Status changed successfully.")
    } catch (err) {
      ErrorToast("An error occurred please try again later.");

    }
  };


  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Skill Levels</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Create Skill Level
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : !skillLevels || skillLevels.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">No Skill Levels found.</p>
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
                  {skillLevels.map((skillLevel) => (
                    <tr key={skillLevel.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {skillLevel.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {skillLevel.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${skillLevel.status ? "text-green-900" : "text-red-900"
                            } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${skillLevel.status ? "bg-green-200" : "bg-red-200"
                              } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {skillLevel.status ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleOpenModal(skillLevel)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(skillLevel.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleToggleStatus(skillLevel.id, skillLevel.status)
                            }
                            className={`${skillLevel.status
                              ? "text-green-600 hover:text-green-900"
                              : "text-red-600 hover:text-red-900"
                              }`}
                          >
                            {skillLevel.status ? (
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
      <SkillLevelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitSkillLevel}
        skillLevel={editingSkillLevel}
      />
    </div>
  );
};

export default SkillLevel;
