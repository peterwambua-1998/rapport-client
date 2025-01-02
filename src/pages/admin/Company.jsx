import React, { useEffect, useState } from "react";
import { getCompanies, changeCompanyStatus } from "@/services/api/api";
import CompanyVerificationModal from "@/components/admin/CompanyVerificationModal";
import { getImageUrl } from "@/services/helpers/helpers";
import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      if (response.data && response.data.data.length > 0) {
        setCompanies(response.data.data);
        setFilteredCompanies(response.data.data);
      } else {
        setError("No Companies found.");
      }
    } catch (err) {
      console.log(err);
      setError("Error fetching companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const saveStatusChange = async (id, newStatus, remarks) => {
    try {
      await changeCompanyVerification(id, { newStatus, remarks });
      alert("Status updated successfully");
      await fetchCompanies();
    } catch (err) {
      console.error("Error updating status: ", err);
    }
  };
   
  const handleToggleStatus = async (id, currentStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${currentStatus ? "deactivate" : "activate"} this company?`
    );

    if (!confirmation) {
      return;
    }

    try {
      await changeCompanyStatus(id, { newStatus: currentStatus ? 0 : 1 });
      await fetchCompanies();
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    {
      header: "Logo",
      accessorKey: "logo",
      cell: ({ row }) => (
        <img
          src={row.getValue("logo") ? getImageUrl(row.getValue("logo")) : ""}
          alt={`${row.getValue("name")} logo`}
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => row.getValue("description"),
    },
    {
      header: "Status",
      accessorKey: "is_verified",
      cell: ({ row }) => (
        <div className="flex items-center space-x-4">
          <button
            className={`py-1 px-3 rounded text-white ${row.getValue("is_verified") ? "bg-blue-500" : "bg-red-500"
              }`}
            onClick={() => openModal(row.original)}
          >
            {row.getValue("is_verified") ? "Verified" : "Not Verified"}
          </button>
          <button
            onClick={() => handleToggleStatus(row.original.id, row.getValue("status"))}
            className={`${row.getValue("status")
                ? "text-green-600 hover:text-green-900"
                : "text-red-600 hover:text-red-900"
              }`}
          >
            {row.getValue("status") ? (
              <FaToggleOn size={18} />
            ) : (
              <FaToggleOff size={18} />
            )}
          </button>
        </div>
      ),
    },
  ];

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(query) ||
      company.description.toLowerCase().includes(query)
    );

    setFilteredCompanies(filtered);
  };

  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Companies</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or description"
            className="p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center">
              <LoadingSpinner message="Companies" />
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : filteredCompanies.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No Companies found.
            </div>
          ) : (
            <div className="col-span-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column.header}>{column.header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.header}>
                          {flexRender(
                            column.cell,
                            { row: { original: company, getValue: (key) => company[key] } }
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {selectedCompany && (
        <CompanyVerificationModal
          company={selectedCompany}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveStatusChange}
        />
      )}
    </div>
  );
};

export default Company;
