import React from 'react';
import { Check, X, MoreHorizontal } from "lucide-react"
import './StatusRender.css';

export const StatusIcon = ({ type, status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "status-icon--accepted";
      case "rejected":
        return "status-icon--rejected";
      case "pending":
        return "status-icon--pending";
      default:
        return "";
    }
  };

  const renderIcon = (status) => {
    switch (status) {
      case "accepted":
        return <Check className="icon" />;
      case "rejected":
        return <X className="icon" />;
      case "pending":
        return <MoreHorizontal className="icon" />;
      default:
        return <div className="icon-placeholder" />;
    }
  };

  return (
    <div 
      className={`status-icon ${getStatusClass(status)}`} 
      title={`${type}: ${status}`}
    >
      {renderIcon(status)}
    </div>
  );
};