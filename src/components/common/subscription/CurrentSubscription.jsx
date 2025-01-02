import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  getActiveSubscription,
  cancelSubscription,
} from "../../../services/api/api";
import { useNavigate } from "react-router-dom";

const CurrentSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveSubscription();
  }, []);

  const fetchActiveSubscription = async () => {
    try {
      setLoading(true);
      const response = await getActiveSubscription(); 
      if (response.data.success) {
        setSubscription(response.data.data);
      } else {
        setSubscription(null);
      }
    } catch (err) {
      setError("Failed to load subscription data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      try {
        setLoading(true);
        await cancelSubscription(subscription.id);
        // Refresh subscription data after cancellation
        await fetchActiveSubscription();
      } catch (err) {
        setError("Failed to cancel subscription. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderFeatures = (features) => {
    // ... (keep existing renderFeatures function)
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-center text-gray-600">
          Loading subscription data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">No Active Subscription</h2>
        <p className="text-gray-600 mb-4">
          You currently don't have an active subscription.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => navigate("/plans")}
        >
          View Available Plans
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{subscription.plan.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      {subscription.status === "active" && (
        <div className="mt-6">
          <button
            onClick={handleCancelSubscription}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Cancel Subscription
          </button>
        </div>
      )}
      {subscription.status === "canceled" && subscription.cancelAtPeriodEnd && (
        <div className="mt-6">
          <p className="text-yellow-600">
            Your subscription has been cancelled but will remain active until{" "}
            {format(new Date(subscription.endDate), "PP")}.
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentSubscription;
