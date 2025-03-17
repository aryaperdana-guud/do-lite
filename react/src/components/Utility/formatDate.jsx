// Helper function to format dates from timestamps
export const formatDate = (timestamp) => {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

// Helper function to format date and time from timestamps
export const formatDateTime = (timestamp) => {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-GB")}`;
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "";
  }
};
