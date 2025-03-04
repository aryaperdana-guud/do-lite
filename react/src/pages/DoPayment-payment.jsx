import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import PaymentTable from "../components/TableList/PaymentTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const ACTIVE_DATA = [
  {
    id: 1,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 2,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 3,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 4,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 5,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 6,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 7,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 8,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 9,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
  {
    id: 10,
    status: "accepted",
    jobId: "DOJF1234567890",
    jobType: "CLAIM",
    shipmentType: "IMPORT",
    submittedDate: "11/02/2025 10:35:01",
    amount: "Rp 2,345,098",
  },
];

export function DoPayment() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <div className="top-bar">
          <div className="left">
            <h1 className="Title">DO Payment</h1>
          </div>
        </div>
        <div>
          <ProfileDropdown />
          <PaymentTable title="Payment" data={ACTIVE_DATA} />;
        </div>
      </main>
      <div></div>
    </div>
  );
}
