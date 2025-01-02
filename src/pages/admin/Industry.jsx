import React, { useState, useEffect } from "react";
import {
  fetchIndustrys,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  toggleIndustryStatus,
} from "../../services/api/api";

import IndustryModal from "@/components/admin/IndustryModal";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
} from "react-icons/fa";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";

const Industry = () => {
  const [industries, setIndustrys] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingindustry, setEditingIndustry] = useState(null);

  const getIndustrys = async () => {
    try {
      setLoading(true);
      const data = await fetchIndustrys();
      setIndustrys(data.data.data);
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getIndustrys();
  }, []);

  const handleOpenModal = (industry = null) => {
    setEditingIndustry(industry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingIndustry(null);
    setIsModalOpen(false);
  };

  const handleSubmitIndustry = async (formData) => {
    try {
      if (editingindustry) {
        await updateIndustry(editingindustry.id, formData);
        SuccessToast("Record update successfully");
      } else {
        await createIndustry(formData);
        SuccessToast("Record created successfully");
      }
      handleCloseModal();
      await getIndustrys();
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
      
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Industry?")) {
      try {
        await deleteIndustry(id);
        await getIndustrys();
        SuccessToast("Record deleted successfully");
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
      await toggleIndustryStatus(id, { status: currentStatus ? 0 : 1 });
      await getIndustrys();
      SuccessToast("Status changed successfully");
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Industry</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Create Industry
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : !industries || industries.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">No Industries found.</p>
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
                  {industries.map((industry) => (
                    <tr key={industry.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {industry.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {industry.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${industry.status
                            ? "text-green-900"
                            : "text-red-900"
                            } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${industry.status ? "bg-green-200" : "bg-red-200"
                              } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {industry.status ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleOpenModal(industry)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit size={18} /> {/* Adjust the size as needed */}
                          </button>
                          <button
                            onClick={() => handleDelete(industry.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleToggleStatus(industry.id, industry.status)
                            }
                            className={`${industry.status
                              ? "text-green-600 hover:text-green-900"
                              : "text-red-600 hover:text-red-900"
                              }`}
                          >
                            {industry.status ? (
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
      <IndustryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitIndustry}
        industry={editingindustry}
      />
    </div>
  );
};

export default Industry;
