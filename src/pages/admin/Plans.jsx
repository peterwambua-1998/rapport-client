import React, { useState, useEffect } from "react";
import {
  fetchPlans,
  createPlan,
  updatePlan,
  deletePlan,
  togglePlanStatus,
  fetchFeatures,
  updatePlanFeatures,
} from "@/services/api/api";
import PlanModal from "@/components/admin/PlanModal";
import PlanFeaturesModal from "@/components/admin/PlanFeaturesModal";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaListUl,
} from "react-icons/fa";

const Plans = () => {
  const [plans, setPlans] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansData, featuresData] = await Promise.all([
        fetchPlans(),
        fetchFeatures(),
      ]);

      setPlans(plansData.data);
      setFeatures(featuresData.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPlanModal = (plan = null) => {
    setEditingPlan(plan);
    setIsPlanModalOpen(true);
  };

  const handleClosePlanModal = () => {
    setEditingPlan(null);
    setIsPlanModalOpen(false);
  };

  const handleOpenFeatureModal = (plan) => {
    setEditingPlan(plan);
    setIsFeatureModalOpen(true);
  };

  const handleCloseFeatureModal = () => {
    setEditingPlan(null);
    setIsFeatureModalOpen(false);
  };

  const handleSubmitPlan = async (formData) => {
    try {
      if (editingPlan) {
        await updatePlan(editingPlan.id, formData);
      } else {
        await createPlan(formData);
      }
      handleClosePlanModal();
      await fetchData();
    } catch (err) {
      console.error("Error submitting plan:", err);
      setError(err.message || "An error occurred while submitting the plan");
    }
  };

  const handleSubmitPlanFeatures = async (features) => {
    try {
      await updatePlanFeatures(editingPlan.id, features);
      handleCloseFeatureModal();
      await fetchData();
    } catch (err) {
      console.error("Error updating plan features:", err);
      setError(err.message || "An error occurred while updating plan features");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePlan(id);
        await fetchData();
      } catch (err) {
        console.error("Error deleting plan:", err);
        setError(err.message || "An error occurred while deleting the plan");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await togglePlanStatus(id, !currentStatus);
      await fetchData(); // Refresh the plans list
    } catch (err) {
      console.error("Error toggling plan status:", err);
      setError(err.message || "An error occurred while toggling plan status");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Plans</h1>
          <button
            onClick={() => handleOpenPlanModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Create Plan
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : !plans || plans.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">No plans found.</p>
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
                      Monthly Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Yearly Price
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
                  {plans.map((plan) => (
                    <tr key={plan.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {plan.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {plan.monthly_currency} {plan.monthly_price}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {plan.yearly_currency} {plan.yearly_price}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${plan.isActive ? "text-green-900" : "text-red-900"
                            } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${plan.isActive ? "bg-green-200" : "bg-red-200"
                              } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {plan.isActive ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleOpenPlanModal(plan)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleOpenFeatureModal(plan)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            <FaListUl />
                          </button>
                          <button
                            onClick={() => handleDelete(plan.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() =>
                              handleToggleStatus(plan.id, plan.isActive)
                            }
                            className={`${plan.isActive
                              ? "text-green-600 hover:text-green-900"
                              : "text-red-600 hover:text-red-900"
                              }`}
                          >
                            {plan.isActive ? <FaToggleOn /> : <FaToggleOff />}
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
      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={handleClosePlanModal}
        onSubmit={handleSubmitPlan}
        plan={editingPlan}
      />

      <PlanFeaturesModal
        isOpen={isFeatureModalOpen}
        onClose={handleCloseFeatureModal}
        onSubmit={handleSubmitPlanFeatures}
        plan={editingPlan}
        allFeatures={features}
      />
    </div>
  );
};

export default Plans;
