import React, { useState, useEffect } from "react";
import { fetchSubscriptions, cancelSubscription } from "../../services/api/api";

import { FaBan } from "react-icons/fa";
import { format } from "date-fns";
import ErrorToast from "@/components/toasts/error";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const data = await fetchSubscriptions();
        setSubscriptions(data.data.data);
        setLoading(false);
      } catch (err) {
        // setError(err.message);
        ErrorToast("An error occurred please try again later.");
        setLoading(false);
      }
    };

    getSubscriptions();
  }, []);

  const handleCancelSubscription = async (id) => {
    if (window.confirm("Are you sure you want to cancel this subscription?")) {
      try {
        await cancelSubscription(id);
        setSubscriptions(
          subscriptions.map((sub) =>
            sub._id === id ? { ...sub, status: "canceled" } : sub
          )
        );
        SuccessToast("Subscription cancelled successfully");
      } catch (err) {
        ErrorToast("An error occurred please try again later.");
        // setError(err.message);
      }
    }
  };

  return (
    <div className="">
      <div className="p-6">
        {loading ? (
          <div className="col-span-full text-center">
            <LoadingSpinner />
          </div>
        ) : !subscriptions || subscriptions.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-lg">No subscriptions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {subscription.user.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {subscription.plan.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold ${subscription.status === "active"
                          ? "text-green-900"
                          : subscription.status === "canceled"
                            ? "text-red-900"
                            : "text-yellow-900"
                          } leading-tight`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${subscription.status === "active"
                            ? "bg-green-200"
                            : subscription.status === "canceled"
                              ? "bg-red-200"
                              : "bg-yellow-200"
                            } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative capitalize">
                          {subscription.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {format(
                          new Date(subscription.startDate),
                          "MMM dd, yyyy"
                        )}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {format(new Date(subscription.endDate), "MMM dd, yyyy")}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {subscription.status === "active" && (
                        <button
                          onClick={() =>
                            handleCancelSubscription(subscription._id)
                          }
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <FaBan className="mr-1" /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
