import React, { useEffect, useState } from "react";
import { getJobseekers, updateUserStatus } from "../../services/api/api";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import UserUpdateStatusModal from "@/components/admin/UserUpdateStatusModal";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";

const Jobseekers = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };


  const fetchJobseekers = async () => {
    try {
      const response = await getJobseekers();
      if (response.data && response.data.length > 0) {
        setJobseekers(response.data);
      } else {
        setError("No jobseekers found.");
      }
    } catch (err) {
      setError("Error fetching job seekers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobseekers();
  }, []);

  const saveStatusChange = async (id, newStatus, remarks) => {
    try {
      await updateUserStatus(id, { newStatus, remarks });
      alert("Status updated successfully");
      await fetchJobseekers();
    } catch (err) {
      console.error("Error updating status: ", err);
    }
  };

  return (
    <div> 
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Job Seekers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) :   jobseekers.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No jobseekers found.
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
                  {jobseekers.map((jobseeker, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        <img
                          src={jobseeker.avatar ? getImageUrl(jobseeker.avatar) : ""}
                          alt={`${jobseeker.name} logo`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 border">{jobseeker.name}</td>
                      <td className="px-4 py-2 border">{jobseeker.email}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => openModal(jobseeker)}
                          className={`${jobseeker.status
                            ? "text-green-600 hover:text-green-900"
                            : "text-red-600 hover:text-red-900"
                            }`}
                        >
                          {jobseeker.status ? (
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
      {selectedUser && (
        <UserUpdateStatusModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveStatusChange}
        />
      )}
    </div>
  );
};

export default Jobseekers;
