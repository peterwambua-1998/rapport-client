import { format } from 'date-fns';

export const getImageUrl = (imagePath) => {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  // Normalize the path to replace any backslashes with forward slashes
  const normalizedPath = imagePath.replace(/\\/g, '/');

  // Ensure the path starts with a single slash
  const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;

  return `${SERVER_URL}${cleanPath}`;
};

export const formatDateTime = (date) => {
  if (!date)  {
    return new Date().toLocaleString('en-US', {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  return new Date(date).toLocaleString('en-US', {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// used to determine if user should select data source
export const validateIntro = async (profileInfo) => {
  const requiredFields = [
    'AboutMe', 'ProfessionalTitle', 'Location', 'Industry', 
    'YearsofExperience', 'CurrentRole', 'Company', 'Skills', 'videoUrl', 'CurrentRole',
    'Company', 'Education', 'WorkExperience',
  ];

  const missingFields = requiredFields.filter(field => 
    !profileInfo[field] || profileInfo[field] === '' || profileInfo[field].length == 0
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      missingFields,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  return {
    isValid: true,
    missingFields: null,
    message: 'Profile is valid'
  };

}

export const validateProfileInfo = async (profileInfo) => {
  const requiredFields = [
    'AboutMe', 'ProfessionalTitle', 'Location', 'Industry', 
    'YearsofExperience', 'CurrentRole', 'Company', 'Skills'
  ];

  const missingFields = requiredFields.filter(field => 
    !profileInfo[field] || profileInfo[field] === ''
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      missingFields,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  // Validate array properties
  const arrayValidations = [
    { 
      field: 'Education', 
      validate: (items) => items.length > 0 && 
        items.every(item => 
          item.school && item.degree && item.major && 
          item.startDate && item.endDate
        )
    },
    { 
      field: 'WorkExperience', 
      validate: (items) => items.length > 0 && 
        items.every(item => 
          item.position && item.employer && 
          item.description && item.startDate
        )
    },
    { 
      field: 'Skills', 
      validate: (items) => items.length > 0 && 
        items.every(item => item.name && item.proficiency)
    }
  ];

  for (const validation of arrayValidations) {
    if (!validation.validate(profileInfo[validation.field])) {
      return {
        isValid: false,
        missingFields: [validation.field],
        message: `Invalid or empty ${validation.field}`
      };
    }
  }

  return {
    isValid: true,
    missingFields: null,
    message: 'Profile is valid'
  };
}

// format dates 
export const formatDate = (dateString) => {
  if (!dateString) return 'Present';
  try {
    return format(new Date(dateString), 'MMM yyyy');
  } catch (error) {
    return format(new Date(), 'MMM yyyy');
  }
};


export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};