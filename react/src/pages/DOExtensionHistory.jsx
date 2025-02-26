import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import { ExtensionTable } from "../components/TableList/ExtensionTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const ACTIVE_DATA = [
  {
    id: 1,
    status: "rejected",
    jobNo: "CKJOB241218183084",
    blNo: "MEDUU12345",
    originalDoNo: "DO010122035TES",
    noOfContainers: 1,
    extendedValidDate: "20/02/2025",
    amount: "Rp 1.254.815.000,-",
    paymentDate: "20/02/2024",
  },
  {
    id: 2,
    status: "rejected",
    jobNo: "CKJOB241218183085",
    blNo: "MEDUU12346",
    originalDoNo: "DO010122036TES",
    noOfContainers: 2,
    extendedValidDate: "21/02/2025",
    amount: "Rp 2.254.815.000,-",
    paymentDate: "21/02/2024",
  },
  {
    id: 3,
    status: "rejected",
    jobNo: "CKJOB241218183085",
    blNo: "MEDUU12346",
    originalDoNo: "DO010122036TES",
    noOfContainers: 2,
    extendedValidDate: "21/02/2025",
    amount: "Rp 2.254.815.000,-",
    paymentDate: "21/02/2024",
  },
  // Add more dummy data as needed
];

export function ExtensionHistory() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <div className="top-bar">
          <div className="left">
            <h1 className="Title">DO Extension</h1>
          </div>
        </div>
        <div>
          <ProfileDropdown />
          <ExtensionTable title="History List" data={ACTIVE_DATA} />;
        </div>
      </main>
      <div></div>
    </div>
  );
}
