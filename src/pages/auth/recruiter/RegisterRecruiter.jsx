import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import {
  createCompany,
  getCompanies,
  getCountries,
} from "@/services/api/api";
import CreateCompanyModal from "@/components/recruiter/Company/CreateCompanyModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import logo from '@/assets/images/logo.png'
import { getImageUrl } from "@/services/helpers/helpers";
import { PasswordStrength } from "@/components/common/auth/PasswordStrength";
import ErrorToast from "@/components/toasts/error";
import { PulseLoader } from "react-spinners";
import HeaderNav from "../header/header";

export default function RegisterRecruiterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    country: "United States",
    company: "",
    companyId: "",
    role: "Recruiter",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [showCompanyInput, setShowCompanyInput] = useState(false);

  const fetchAllCompanies = async () => {
    try {
      const companies = await getCompanies();
      setAllCompanies(companies.data.data);
    } catch (err) {
      ErrorToast("Error fetching companies:");
    }
  };

  const fetchAllCountries = async () => {
    try {
      const countries = await getCountries();
      setAllCountries(countries.data.data);
    } catch (err) {
      ErrorToast("Error fetching countries...");
    }
  };


  useEffect(() => {
    fetchAllCountries();
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setSearchResults(
        allCompanies.filter((company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allCompanies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      ErrorToast("Passwords do not match");
      setLoading(false)
      return;
    }

    setError("");

    try {
      await register({ ...formData, type: "recruiter" });
      navigate("/recruiter/dashboard");
    } catch (error) {
      ErrorToast("Registration failed. Please try again.");
      setLoading(false)
    }
  };

  const handleCreateCompany = async (companyData) => {
    setError("");
    try {
      await createCompany(companyData);
      closeModal();
      fetchAllCompanies();
    } catch (error) {
      // setError("Registration failed. Please try again.");
      ErrorToast("company registration failed. Please try again.")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue); // Update the search term in real-time
    setFormData((prev) => ({
      ...prev,
      company: searchValue, // Reflect the searched term in the form data
    }));
  };

  const handleCompanySelect = (company) => {
    setSearchTerm(""); // Clear the search input but keep the selected company visible
    setFormData((prev) => ({
      ...prev,
      company: company.name, // Update the form with the selected company's name
      companyId: company.id, // Store the selected company's ID
    }));
    setSearchResults([]); // Clear the dropdown
  };

  return (
    <div>
      <HeaderNav />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mt-2 mb-6">
            Create your recruiter account
          </h1>
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name and Last Name */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    defaultValue={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    defaultValue={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  name="companyName"
                  onChange={handleChange}
                  defaultValue={formData.companyName}
                  placeholder="Optional"

                />
              </div>

              {/* Country */}
              <div>
                <Label htmlFor="country">Country</Label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded-md bg-white text-sm"
                  required
                >
                  <option value="United States">United States</option>
                </select>
              </div>

              {/* Company Search */}
              <div className="relative">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Button
                    type="button"
                    variant="link"
                    onClick={openModal}
                    className="text-blue-600 text-sm"
                  >
                    Create New Company
                  </Button>
                </div>
                <Input
                  id="company"
                  placeholder="Search for company..."
                  value={formData.company || searchTerm}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />

                {searchTerm && searchResults.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((company) => (
                      <li
                        key={company.id}
                        onClick={() => handleCompanySelect(company)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={company?.logo ? getImageUrl(company.logo) : ""}
                          alt={`${company.name} logo`}
                          className="w-6 h-6 object-contain rounded"
                        />
                        <span>{company.name}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <input type="hidden" name="companyId" value={formData.companyId} />
              </div>


              <div>
                <Label htmlFor="country">Role</Label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded-md bg-white text-sm"
                  required
                >
                  <option value="Recruiter">Recruiter</option>
                  <option value="HR Professional">HR Professional</option>
                  <option value="Hiring Manager">Hiring Manager</option>
                </select>
              </div>


              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  defaultValue={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  defaultValue={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <PasswordStrength password={formData.password} setIsValid={setIsValid} />

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="w-full font-bold bg-blue-700 hover:bg-blue-700"
                  onClick={() => setLoading(true)}
                >
                  {loading ? <PulseLoader size={8} color="#ffffff" /> : "next"}

                </Button>
              </div>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/recruiter/login"
                className="text-blue-500 hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <CreateCompanyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleCreateCompany}
          company={[]}
        />
      </div>
    </div>
  );
} 