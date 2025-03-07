import React from "react";
import { Check, X, MoreHorizontal, Plus } from "lucide-react";

export const StatusIcon = ({ status }) => {
  const statusMap = {
    NEW: { title: "New", icon: <Plus />, color: "#007bff" }, // Blue
    CNF: { title: "Confirmed", icon: <Check />, color: "#28a745" }, // Green
    CNCL: { title: "Cancel", icon: <X />, color: "#dc3545" }, // Red
    PAID: { title: "Paid", icon: <Check />, color: "#ffc107" }, // Yellow
  };

  const statusData = statusMap[status] || {
    title: "Unknown",
    icon: <div />,
    color: "#6c757d",
  }; // Default Gray

  const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "25%",
    fontSize: "16px",
    color: "white",
    backgroundColor: statusData.color, // Dynamically set background color
  };

  return (
    <div style={iconStyle} title={statusData.title}>
      {statusData.icon}
    </div>
  );
};
