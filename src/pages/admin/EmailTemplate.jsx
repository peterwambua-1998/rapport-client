import React, { useState, useEffect } from "react";
import {
  fetchEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  toggleEmailTemplateStatus,
} from "@/services/api/api";

import EmailTemplateModal from "@/components/admin/EmailTemplateModal";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
} from "react-icons/fa";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
const EmailTemplate = () => {
  const [emailTemplates, setEmailTemplates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmailTemplate, seteditingEmailTemplate] = useState(null);

  const getEmailTemplates = async () => {
    try {
      setLoading(true);
      const data = await fetchEmailTemplates();
      setEmailTemplates(data.data.data);
    } catch (err) {
      ErrorToast("An error occurred please try again later.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmailTemplates();
  }, []);

  const handleOpenModal = (emailTemplate = null) => {
    seteditingEmailTemplate(emailTemplate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    seteditingEmailTemplate(null);
    setIsModalOpen(false);
  };

  const handleSubmitEmailTemplate = async (formData) => {
    try {
      if (editingEmailTemplate) {
        await updateEmailTemplate(editingEmailTemplate.id, formData);
        SuccessToast("Record updated successfully.")
      } else {
        await createEmailTemplate(formData);
        SuccessToast("Record created successfully.")
      }
      handleCloseModal();
      await getEmailTemplates();
    } catch (err) {
      ErrorToast("An error occurred please try again later.");

    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this email template?")) {
      try {
        await deleteEmailTemplate(id);
        await getEmailTemplates();
        SuccessToast("Record deleted successfully.")
      } catch (err) {
        ErrorToast("An error occurred please try again later.");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${currentStatus ? "deactivate" : "activate"
      } this Email Template?`
    );

    if (!confirmation) {
      return;
    }

    try {
      await toggleEmailTemplateStatus(id, { status: currentStatus ? 0 : 1 });
      await getEmailTemplates();
      SuccessToast("Status changed successfully.")
    } catch (err) {
      ErrorToast("An error occurred please try again later.");

    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Email Template</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Create Email Template
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner />
            </div>
          ) : !emailTemplates || emailTemplates.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">No Email Templates found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Body
                    </th> */}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emailTemplates.map((emailTemplate) => (
                    <tr key={emailTemplate.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {emailTemplate.type}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {emailTemplate.subject}
                        </p>
                      </td>
                      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {emailTemplate.body}
                        </p>
                      </td> */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${emailTemplate.status ? "text-green-900" : "text-red-900"
                            } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${emailTemplate.status ? "bg-green-200" : "bg-red-200"
                              } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {emailTemplate.status ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleOpenModal(emailTemplate)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(emailTemplate.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleToggleStatus(emailTemplate.id, emailTemplate.status)
                            }
                            className={`${emailTemplate.status
                              ? "text-green-600 hover:text-green-900"
                              : "text-red-600 hover:text-red-900"
                              }`}
                          >
                            {emailTemplate.status ? (
                              <FaToggleOn size={18} />
                            ) : (
                              <FaToggleOff size={18} />
                            )}
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
      <EmailTemplateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEmailTemplate}
        emailTemplate={editingEmailTemplate}
      />
    </div>
  );
};

export default EmailTemplate;
