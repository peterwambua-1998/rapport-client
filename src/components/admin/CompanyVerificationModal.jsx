import React, { useState } from "react";
import { PulseLoader } from "react-spinners";

const CompanyVerificationModal = ({ company, isOpen, onClose, onSave }) => {
  const [status, setStatus] = useState(company.is_verified);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    onSave(company.id, !status, remarks);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Company Status</h2>
        <div className="mb-4">
          <p className="font-medium text-gray-700">Name: {company.name}</p>
          <p className="text-sm text-gray-500">
            Status: {status ? "Verified" : "Not Verified"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Remarks</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            rows="4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks here"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-1 px-3 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-1 px-3 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyVerificationModal;
