import React, { useEffect, useState } from "react";
import { getAdmins, changeAdminStatus } from "@/services/api/api";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";

const Users = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAdmins();
        if (response.data && response.data.length > 0) {
          setAdmins(response.data);
        } else {
          ErrorToast("An error occurred please try again later.");
          // setError("No admins found.");
        }
      } catch (err) {
        ErrorToast("An error occurred please try again later.");
        // setError("Error fetching admins.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeAdminStatus(id, newStatus);
      SuccessToast("Status updated successfully");
    } catch (err) {
      ErrorToast("An error occurred please try again later.");
    }
  };

  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Admins</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : admins.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No admins found.
            </div>
          ) : (
            <div className="col-span-full overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={admin.id}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{admin.name}</td>
                      <td className="px-4 py-2 border">{admin.email}</td>
                      <td className="px-4 py-2 border">
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded"
                          onClick={() =>
                            handleStatusChange(
                              admin.id,
                              !admin.verificationStatus
                            )
                          }
                        >
                          {admin.verificationStatus ? "Deactivate" : "Activate"}
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
    </div>
  );
};

export default Users;
