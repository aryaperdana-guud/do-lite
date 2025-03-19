// Helper function to format dates from timestamps
export const formatDate = (timestamp) => {
  if (!timestamp) return " ";
  try {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

// Helper function to format date and time from timestamps
export const formatDateTime = (timestamp) => {
  if (!timestamp) return " ";
  try {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-GB")}`;
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "";
  }
};

//format yyyy-mm-dd untuk input date
export const formatDateForInputDate = (timestamp) => {
  if (!timestamp) return ""; 

  const date = new Date(timestamp);
  if (isNaN(date)) return ""; // Handle Invalid Date

  return date.toISOString().split("T")[0]; // Menghasilkan format yyyy-MM-dd
};
