import React from "react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";
const Notifications = () => {
  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Notifications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <h1 className="text-2xl font-semibold">Notifications Content</h1>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
