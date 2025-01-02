import React, { useState, useEffect } from "react";
import { getPlans } from "../../../services/api/api";
import useSubscription from "../../../hooks/useSubscription";
import { useNavigate } from "react-router-dom";

const UserPlans = () => {
  const { subscriptions, loading, cancelUserSubscription } = useSubscription();
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [billingFrequency, setBillingFrequency] = useState("monthly");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await getPlans();
      setPlans(response.data || []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setPlans([]);
    } finally {
      setLoadingPlans(false);
    }
  };

  const handleSubscribe = (planId) => {
    navigate(`/checkout/${planId}/${billingFrequency}`);
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      await cancelUserSubscription(subscriptionId);
      // Refresh subscriptions after cancellation
      // You might want to implement a refresh function in your useSubscription hook
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    }
  };

  const handleUpgradeDowngrade = (planId, action) => {
    navigate(`/change-plan/${planId}/${action}/${billingFrequency}`);
  };

  const renderFeatures = (features) => {
    return features.map((featureItem, index) => (
      <li key={index} className="flex items-center mb-2">
        <svg
          className="w-4 h-4 mr-2 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        {featureItem.feature_id}
      </li>
    ));
  };

  const renderActionButton = (plan) => {
    const currentSubscription = subscriptions.find(
      (sub) => sub.status === "active"
    );

    if (!currentSubscription) {
      return (
        <button
          onClick={() => handleSubscribe(plan.id)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Get started
        </button>
      );
    }

    const currentPlanPrice =
      currentSubscription.billingCycle === "monthly"
        ? currentSubscription.plan.monthly_price
        : currentSubscription.plan.yearly_price;

    const thisPlanPrice =
      billingFrequency === "monthly" ? plan.monthly_price : plan.yearly_price;

    if (
      currentSubscription.plan.id === plan.id &&
      currentSubscription.billingCycle === billingFrequency
    ) {
      return (
        <button
          onClick={() => handleCancelSubscription(currentSubscription.id)}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Cancel Subscription
        </button>
      );
    } else if (
      currentSubscription.plan.id === plan.id &&
      currentSubscription.billingCycle !== billingFrequency
    ) {
      return (
        <button
          onClick={() => handleUpgradeDowngrade(plan.id, "change-cycle")}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          Change to {billingFrequency}
        </button>
      );
    } else if (thisPlanPrice > currentPlanPrice) {
      return (
        <button
          onClick={() => handleUpgradeDowngrade(plan.id, "upgrade")}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Upgrade Plan
        </button>
      );
    } else {
      return (
        <button
          onClick={() => handleUpgradeDowngrade(plan.id, "downgrade")}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          Downgrade Plan
        </button>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h1>
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-lg ${
            billingFrequency === "monthly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setBillingFrequency("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${
            billingFrequency === "yearly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setBillingFrequency("yearly")}
        >
          Yearly
        </button>
      </div>
      {loadingPlans || loading ? (
        <p className="text-center">Loading plans...</p>
      ) : plans && plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.id || index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-3xl font-bold mb-4">
                $
                {billingFrequency === "monthly"
                  ? plan.monthly_price
                  : (plan.yearly_price / 12).toFixed(2)}
                <span className="text-sm font-normal">
                  /
                  {billingFrequency === "monthly"
                    ? "Month"
                    : "User/Month (billed annually)"}
                </span>
              </p>
              <p className="mb-4">{plan.description}</p>
              <h3 className="font-semibold mb-2">Includes:</h3>
              <ul className="mb-4 flex-grow">
                {plan.PlanFeatures.length > 0 ? (
                  renderFeatures(plan.PlanFeatures)
                ) : (
                  <li>No specific features listed</li>
                )}
              </ul>
              {renderActionButton(plan)}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">
          No subscription plans available at the moment.
        </p>
      )}
    </div>
  );
};

export default UserPlans;
