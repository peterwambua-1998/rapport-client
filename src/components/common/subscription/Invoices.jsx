import React, { useState, useEffect } from "react"; 
import { getInvoices } from "../../../services/api/api";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const response = await getInvoices();
    setInvoices(response.data);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-10">
      <div className="p-4"> 
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-4 py-2 whitespace-nowrap border-b border-gray-200">
                      {invoice.id}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap border-b border-gray-200">
                      {invoice.userId}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap border-b border-gray-200">
                      ${invoice.amount}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap border-b border-gray-200">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap border-b border-gray-200">
                      {invoice.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 whitespace-nowrap text-center text-gray-500 border-b border-gray-200"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
