import { DeviceUnknown, QuestionMark } from "@mui/icons-material";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  EllipsisIcon,
  Hourglass,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";

export const StatusIcon = ({ status }) => {
  const normalizeStatus = (status) => {
    return status?.trim().toUpperCase().replace(/\s+/g, "_");
  };

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
    }, // Red
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

    // Special statuses
    CANCELLED: {
      title: "Cancelled",
      icon: <X />,
      color: "#721c24",
      backgroundColor: "#f8d7da",
    }, // Red
    ASSIGNED: {
      title: "Assigned",
      icon: <Check />,
      color: "#0d6efd",
      backgroundColor: "#e3f2fd",
    }, // Blue
    INVALID: {
      title: "Try Again",
      icon: <RotateCcw />,
      color: "#b35f00",
      backgroundColor: "#ffe8cc",
    }, // Orange

    // Payment statuses
    PYG: {
      title: "Unpaid",
      icon: <AlertTriangle />,
      color: "#b68900",
      backgroundColor: "#fff4d4",
    }, // Yellow
    CON: {
      title: "Confirmed",
      icon: <CheckCircle />,
      color: "#0F8A5F",
      backgroundColor: "#D6F5E3",
    }, // Teal-Green

    // Document statuses
    VERIFIED: {
      title: "Verified",
      icon: <Check />,
      color: "#198754",
      backgroundColor: "#d1e7dd",
    }, // Green
    REJECTED: {
      title: "Rejected",
      icon: <X />,
      color: "#721c24",
      backgroundColor: "#f8d7da",
    }, // Red
    PENDING_RETURN: {
      title: "Not Surrendered",
      icon: <EllipsisIcon />,
      color: "#D48806",
      backgroundColor: "#FFF7E6",
    }, // Yellow-Orange
    SURRENDERED: {
      title: "Surrendered",
      icon: <Check />,
      color: "#198754",
      backgroundColor: "#d1e7dd",
    },
  };

  const normalizedStatus = normalizeStatus(status);
  const statusData = statusMap[normalizedStatus] || {
    title: "Unknown",
    icon: <QuestionMark />,
    color: "#AAAAAA",
    backgroundColor: "#EAEAEA",
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
    backgroundColor: statusData.backgroundColor,
  };

  return (
    <div style={iconStyle} title={statusData.title}>
      {statusData.icon}
    </div>
  );
};
