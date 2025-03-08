import React from "react";
import { Check, X, Plus, Hourglass, RotateCcw } from "lucide-react";

export const StatusIcon = ({ status }) => {
  const statusMap = {
    NEW: {
      title: "New",
      icon: <Plus />,
      color: "#0d6efd",
      backgroundColor: "#e3f2fd",
    }, // Blue
    CNF: {
      title: "Confirmed",
      icon: <Check />,
      color: "#198754",
      backgroundColor: "#d1e7dd",
    }, // Green
    CNCL: {
      title: "Cancelled",
      icon: <X />,
      color: "#721c24",
      backgroundColor: "#f8d7da",
    }, //red
    PAID: {
      title: "Paid",
      icon: <Check />,
      color: "#198754",
      backgroundColor: "#d1e7dd",
    }, // Green
    ONGOING_VERIF: {
      title: "Ongoing Verification",
      icon: <Hourglass />,
      color: "#b35f00",
      backgroundColor: "#ffe8cc",
    }, // Orange

    //"ASSIGNED","CANCELLED","INVALID"(try Again)
    CANCELLED: {
      title: "Cancelled",
      icon: <X />,
      color: "#721c24",
      backgroundColor: "#f8d7da",
    }, // red
    ASSIGNED: {
      title: "Assigned",
      icon: <Check />,
      color: "#0d6efd",
      backgroundColor: "#e3f2fd",
    }, // blue
    INVALID: {
      title: "Try Again",
      icon: <RotateCcw />,
      color: "#b35f00",
      backgroundColor: "#ffe8cc",
    }, // Orange
  };

  const statusData = statusMap[status] || {
    title: "Unknown",
    icon: <div />,
    color: "#EAEAEA",
  }; // Default Gray

  const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "25%",
    fontSize: "16px",
    color: statusData.color,
    backgroundColor: statusData.backgroundColor, // Dynamically set background color
  };

  return (
    <div style={iconStyle} title={statusData.title}>
      {statusData.icon}
    </div>
  );
};
