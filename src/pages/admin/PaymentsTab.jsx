import React, { useState, useEffect } from "react";
import { getPayments } from "@/services/api/api";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

const StatusBadge = ({ status }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`${baseClasses} ${statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      setPayments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : payments && payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment.user.firstName} {payment.user.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment.subscription.plan.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${payment.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={payment.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-2 whitespace-nowrap text-center text-gray-500 border-b border-gray-200"
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No payment records found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
