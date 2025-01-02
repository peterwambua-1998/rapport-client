export const getImageUrl = (imagePath) => {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  // Normalize the path to replace any backslashes with forward slashes
  const normalizedPath = imagePath.replace(/\\/g, '/');

  // Ensure the path starts with a single slash
  const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;

  return `${SERVER_URL}${cleanPath}`;
};
