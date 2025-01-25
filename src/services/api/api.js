import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

const api = axios.create({
  baseURL: API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = localStorage.getItem("token");
        localStorage.setItem("token", token);
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Auth routes
 */
export const register = (userData) => {
  return api.post("/auth/register", userData);
};

export const registerJobSeeker = (userData) => {
  return api.post("/auth/jobseeker-register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const login = (credentials) => api.post("/auth/login", credentials);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (token, newPassword) =>
  api.put(`/auth/reset-password/${token}`, { password: newPassword });
export const setNewPassword = (id, newPassword) =>
  api.put(`/auth/set-password/${id}/set`, { password: newPassword });
export const verifyEmail = (token) =>
  api.put(`/auth/verify-email/${token}`);
export const resendVerification = (data) => api.post(`/auth/resend/verification`, data);
/**
 * Auth routes
 */


/**
 * Data source routes
 */
export const processDataSourceFile = (data) => {
  return api.post(`/auth/file/process`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const storePersonalInfo = (data) => {
  return api.post(`/auth/personal-info/store`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const storeProfessionalInfo = (data) => api.post(`/auth/professional-info/store`, data);
export const storeEducationInfo = (data) => api.post(`/auth/education-info/store`, data);
export const storeExperienceInfo = (data) => api.post(`/auth/experience-info/store`, data);
export const storeCertInfo = (data) => api.post(`/auth/cert-info/store`, data);
export const storeSkillInfo = (data) => api.post(`/auth/skills-info/store`, data);
export const getSeekerProfile = () => api.get("/auth/profile/job-seeker");
/**
 * Data source routes
 */

export const changePassword = (data) => api.put("/auth/change-password", data);

export const linkedInLogin = (role) => {
  window.location.href = `${API_BASE_URL}/api/auth/${role}/linkedin`;
};

export const getCurrentUser = () => api.get("/auth/me");
export const logout = async () => {
  await api.post("/auth/logout");
  sessionStorage.clear();
  localStorage.clear();
  document.cookie =
    "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Dashboard
export const getAdminDashboard = () => api.get("/api/dashboard");

// Recruiters
export const getRecruiters = () => api.get("/users/recruiters");
export const getRecruiterById = (id) => api.get(`/users/recruiters/${id}`);

// Jobseekers
export const getJobseekers = () => api.get("/users/jobseekers");
export const getJobseekerById = (id) => api.get(`/users/${id}/jobseeker`);
export const updateUserStatus = (id, data) =>
  api.put(`/users/${id}/status`, data);

// Admins
export const getAdmins = () => api.get("/users/admins");
export const getAdminById = (id) => api.get(`/users/admins/${id}`);
export const changeAdminStatus = (id, status) =>
  api.patch(`/users/admins/${id}/status`, { status });
export const getProfileMs = (id) => api.get('/users/ms/');

export const updateAdminProfile = (profileData) => {
  return api.put(`users/admin-profile`, profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Features
export const fetchFeatures = () => api.get("/features");
export const getFeatureById = (id) => api.get(`/features/${id}`);
export const createFeature = (feature) => api.post("/features", feature);
export const updateFeature = (id, feature) =>
  api.put(`/features/${id}`, feature);
export const deleteFeature = (id) => api.delete(`/features/${id}`);
export const toggleFeatureStatus = (id, featureData) =>
  api.put(`/features/${id}`, featureData);

// Plans
export const getPlans = () => api.get("/plans");
export const fetchPlans = () => api.get("/plans");
export const getPlanById = (id) => api.get(`/plans/${id}`);
export const createPlan = (planData) => api.post("/plans", planData);
export const updatePlan = (id, planData) => api.put(`/plans/${id}`, planData);
export const togglePlanStatus = (id, planData) =>
  api.put(`/plans/${id}`, planData);
export const updatePlanFeatures = (id, planData) =>
  api.put(`/plans/${id}/features`, planData);
export const deletePlan = (id) => api.delete(`/plans/${id}`);

// Subscriptions
export const getSubscriptions = () => api.get("/subscriptions");
export const getActiveSubscription = () => api.get("/subscriptions/active");
export const fetchSubscriptions = () => api.get("/subscriptions");
export const createSubscription = (subscriptionData) =>
  api.post("/subscriptions", subscriptionData);
export const updateSubscription = (id, subscriptionData) =>
  api.put(`/subscriptions/${id}`, subscriptionData);
export const cancelSubscription = (id) =>
  api.post(`/subscriptions/${id}/cancel`);

export const createPayment = (paymentData) =>
  api.post("/subscriptions/subscribe", paymentData);

export const capturePayPalPayment = (orderId, status) =>
  api.post("/subscriptions/paypal-capture", { orderId, status });

// Invoices
export const getInvoices = () => api.get("/subscriptions/invoices");

// Payments
export const getPayments = () => api.get("/subscriptions/payments");

// Notifications
export const getNotifications = () => api.get("/notifications");
export const createNotification = (notification) =>
  api.post("/api/notifications", notification);
export const updateNotification = (id, notification) =>
  api.put(`/api/notifications/${id}`, notification);
export const deleteNotification = (id) =>
  api.delete(`/api/notifications/${id}`);

// Settings
export const getSettings = () => api.get("/api/settings");
export const updateSettings = (settings) => api.put("/api/settings", settings);

// Profile
export const getProfile = () => api.get("/users/profile");

export const updateProfile = (profileData) => {
  return api.put(`users/profile`, profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateSeekerProfile = (profileData) => {
  return api.put(`users/seekerprofile`, profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Skills
export const fetchSkills = () => api.get("/skills");
export const getSkillById = (id) => api.get(`/skills/${id}`);
export const createSkill = (skill) => api.post("/skills", skill);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);
export const toggleSkillStatus = (id, data) =>
  api.put(`/skills/${id}/status`, data);

// Industrys
export const fetchIndustrys = () => api.get("/industries");
export const getIndustryById = (id) => api.get(`/industries/${id}`);
export const createIndustry = (data) => api.post("/industries", data);
export const updateIndustry = (id, data) =>
  api.put(`/industries/${id}`, data);
export const deleteIndustry = (id) => api.delete(`/industries/${id}`);
export const toggleIndustryStatus = (id, data) =>
  api.put(`/industries/${id}`, data);

// Skills Level
export const fetchSkillLevels = () => api.get("/skill-levels");
export const getSkillLevelById = (id) => api.get(`/skill-levels/${id}`);
export const createSkillLevel = (data) => api.post("/skill-levels", data);
export const updateSkillLevel = (id, data) =>
  api.put(`/skill-levels/${id}`, data);
export const deleteSkillLevel = (id) => api.delete(`/skill-levels/${id}`);
export const toggleSkillLevelStatus = (id, data) =>
  api.put(`/skill-levels/${id}`, data);

// Years of exeperience
export const fetchYearsOfExperiences = () => api.get("/years-of-experience");
export const getYearsOfExperienceById = (id) =>
  api.get(`/years-of-experience/${id}`);
export const createYearsOfExperience = (data) =>
  api.post("/years-of-experience", data);
export const updateYearsOfExperience = (id, data) =>
  api.put(`/years-of-experience/${id}`, data);
export const deleteYearsOfExperience = (id) =>
  api.delete(`/years-of-experience/${id}`);
export const toggleYearsOfExperienceStatus = (id, data) =>
  api.put(`/years-of-experience/${id}`, data);

// Education Level
export const fetchEducationLevels = () => api.get("/education-levels");
export const getEducationLevelById = (id) => api.get(`/education-levels/${id}`);
export const createEducationLevel = (data) =>
  api.post("/education-levels", data);
export const updateEducationLevel = (id, data) =>
  api.put(`/education-levels/${id}`, data);
export const deleteEducationLevel = (id) =>
  api.delete(`/education-levels/${id}`);
export const toggleEducationLevelStatus = (id, data) =>
  api.put(`/education-levels/${id}`, data);

// Profile Visibility 
export const fetchProfileVisibilities = () => api.get("/profile-visibilities");
export const getProfileVisibilityById = (id) => api.get(`/profile-visibilities/${id}`);
export const createProfileVisibility = (data) => api.post("/profile-visibilities", data);
export const updateProfileVisibility = (id, data) =>
  api.put(`/profile-visibilities/${id}`, data);
export const deleteProfileVisibility = (id) => api.delete(`/profile-visibilities/${id}`);
export const toggleProfileVisibilityStatus = (id, data) =>
  api.put(`/profile-visibilities/${id}/status`, data);


// Email Template
export const fetchEmailTemplates = () => api.get("/email-templates");
export const getEmailTemplateById = (id) => api.get(`/email-templates/${id}`);
export const createEmailTemplate = (data) => api.post("/email-templates", data);
export const updateEmailTemplate = (id, data) => api.put(`/email-templates/${id}`, data);
export const deleteEmailTemplate = (id) => api.delete(`/email-templates/${id}`);
export const toggleEmailTemplateStatus = (id, data) =>
  api.put(`/email-templates/${id}/status`, data);

// Email Template
export const fetchEmailConfigurations = () => api.get("/email-configurations");
export const getEmailConfigurationById = (id) => api.get(`/email-configurations/${id}`);
export const createEmailConfiguration = (data) => api.post("/email-configurations", data);
export const updateEmailConfiguration = (id, data) => api.put(`/email-configurations/${id}`, data);
export const deleteEmailConfiguration = (id) => api.delete(`/email-configurations/${id}`);
export const toggleEmailConfigurationStatus = (id, data) =>
  api.put(`/email-configurations/${id}/status`, data);


// Fetch-only routes
export const getRecruiterDashboard = () => api.get("/recruiter/dashboard");
export const getHelpCenter = () => api.get("/recruiter/help-center");
export const getCandidates = () => api.get("/recruiter/candidates");

// CRUD routes
export const getTeam = () => api.get("/teams");



export const getProjects = () => api.get("/projects");
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const getJobseekerProjects = () => api.get('/projects/jobseeker/projects');
export const getJobseekerProjectById = (id) => api.get(`/projects/${id}/project`);
// project notes
export const addCandidateNote = async (candidateId, note, projectId) => {
  return await api.post(`/projects/candidates/${candidateId}/notes`, { note, projectId });
};
export const updateCandidateStatus = async (candidateId, newStatus, projectId) => {
  return await api.post(`/projects/candidates/${candidateId}/status`, { newStatus, projectId });
}
export const projectNote = (data) => api.post(`/projects/notes/store`, data);
export const endProject = (data) => api.post(`/projects/status`, data);


export const getFeedback = () => api.get("/recruiter/feedback");
export const createFeedback = (data) => api.post("/recruiter/feedback", data);
export const updateFeedback = (id, data) =>
  api.put(`/recruiter/feedback/${id}`, data);
export const deleteFeedback = (id) => api.delete(`/recruiter/feedback/${id}`);


// Company
export const getCompanies = () => api.get("/companies");
export const createCompany = (data) => {
  return api.post('companies', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);
export const getCompanyByName = (name) => api.get(`/companies/${name}/search`);
export const changeCompanyVerification = (id, data) =>
  api.put(`/companies/${id}/verify`, data);
export const changeCompanyStatus = (id, data) =>
  api.put(`/companies/${id}/status`, data);

export const getCountries = () => api.get("/countries");
export const createCountry = (data) => api.post("/countries", data);
export const updateCountry = (id, data) => api.put(`/countries/${id}`, data);
export const deleteCountry = (id) => api.delete(`/countries/${id}`);
export const getCountryByName = (name) => api.get(`/countries/${name}/search`);

// #interviews
export const getQuestions = () => api.get("/interviews/questions");

// Shedule links 

export const getSchedule = () => api.get("/schedule");
export const createSchedule = (data) => api.post("/schedule", data);
export const updateSchedule = (id, data) =>
  api.put(`/schedule/${id}`, data);
export const updateScheduleStatus = (id, data) =>
  api.put(`/schedule/${id}`, data);
export const deleteSchedule = (id) => api.delete(`/schedule/${id}`);


// Conversations 
export const getConversations = () => api.get("/messages");
export const getMessages = () => api.get("/messages");
// export const getMessages = (id) => api.get(`/messages/${id}`);
export const createMessage = (data) => api.post("/messages", data);
export const updateConversationStatus = (id, data) =>
  api.put(`/messages/${id}`, data);



