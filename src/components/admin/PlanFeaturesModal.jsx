import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const PlanFeaturesModal = ({
  isOpen,
  onClose,
  onSubmit,
  plan,
  allFeatures,
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plan && plan.PlanFeatures) {
      console.log(plan.PlanFeatures);
      const initialSelected = {};
      allFeatures.forEach((feature) => {
        // Find matching feature from plan.PlanFeatures
        const planFeature = plan.PlanFeatures.find(
          (pf) => pf.feature_id === feature.id // Adjusted to match feature_id
        );

        // Set the initial selection and limit for each feature
        initialSelected[feature.id] = {
          selected: !!planFeature, // True if planFeature exists
          limit: planFeature ? planFeature.limit : null, // Use limit from planFeature, or null if not found
        };
      });

      setSelectedFeatures(initialSelected);
    } else {
      // If plan doesn't have features, initialize all as unselected
      const initialSelected = {};
      allFeatures.forEach((feature) => {
        initialSelected[feature.id] = {
          selected: false,
          limit: null,
        };
      });
      setSelectedFeatures(initialSelected);
    }
  }, [plan, allFeatures]);

  const handleCheckboxChange = (featureId) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        selected: !prev[featureId]?.selected,
      },
    }));
  };

  const handleLimitChange = (featureId, limit) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        limit: limit === "" ? null : limit,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const features = Object.entries(selectedFeatures)
      .filter(([_, value]) => value.selected)
      .map(([key, value]) => ({
        feature: key,
        limit: value.limit,
      }));

    setLoading(true);
    await onSubmit(features);
    setLoading(false);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Manage Features for {plan?.name}
          </h3>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="max-h-96 overflow-y-auto">
              {allFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between mb-2 p-2 border rounded"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={feature.id}
                      checked={selectedFeatures[feature.id]?.selected || false}
                      onChange={() => handleCheckboxChange(feature.id)}
                      className="mr-2"
                    />
                    <label htmlFor={feature.id}>{feature.name}</label>
                  </div>
                  {feature.type !== "boolean" && (
                    <input
                      type="number"
                      value={selectedFeatures[feature.id]?.limit || ""}
                      onChange={(e) =>
                        handleLimitChange(feature.id, e.target.value)
                      }
                      placeholder="Limit"
                      className="w-24 p-1 border rounded"
                      disabled={!selectedFeatures[feature.id]?.selected}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
            >
              {plan.PlanFeatures.length > 0
                ? "Update Plan Features"
                : "Create Plan Features"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanFeaturesModal;
