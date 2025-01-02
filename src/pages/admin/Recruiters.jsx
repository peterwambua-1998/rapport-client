import React, { useEffect, useState } from "react";
import { getRecruiters, updateUserStatus } from "@/services/api/api";
import UserUpdateStatusModal from "@/components/admin/UserUpdateStatusModal";
import { getImageUrl } from "@/services/helpers/helpers";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";
const Recruiter = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecruiter(null);
  };

  const fetchRecruiters = async () => {
    try {
      const response = await getRecruiters();
      if (response.data && response.data.length > 0) {
        setRecruiters(response.data);
      } else {
        setError("No Recruiters found.");
      }
    } catch (err) {
      setError("Error fetching recruiters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const saveStatusChange = async (id, newStatus, remarks) => {
    try {
      await updateUserStatus(id, { newStatus, remarks });
      alert("Status updated successfully");
      await fetchRecruiters();
    } catch (err) {
      console.error("Error updating status: ", err);
    }
  };

  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Recruiters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              {error}
            </div>
          ) : recruiters.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No Recruiters found.
            </div>
          ) : (
            <div className="col-span-full overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recruiters.map((recruiter, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        <img
                          src={recruiter.avatar ? getImageUrl(recruiter.avatar) : ""}
                          alt={`${recruiter.name} logo`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 border">{recruiter.name}</td>
                      <td className="px-4 py-2 border">{recruiter.email}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => openModal(recruiter)}
                          className={`${recruiter.status
                            ? "text-green-600 hover:text-green-900"
                            : "text-red-600 hover:text-red-900"
                            }`}
                        >
                          {recruiter.status ? (
                            <FaToggleOn size={18} />
                          ) : (
                            <FaToggleOff size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for recruiter status */}
      {selectedRecruiter && (
        <UserUpdateStatusModal
          user={selectedRecruiter}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveStatusChange}
        />
      )}
    </div>
  );
};

export default Recruiter;
