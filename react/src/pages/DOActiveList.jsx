import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import "./DOActiveList.css"
import React from "react"
import {DataTable} from '../components/TableList/DOTable.jsx'
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const ACTIVE_DATA = [
  {
    id: 1,
    payment: "rejected",
    surrender: "pending",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "pending",
    document: "rejected",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 1,
    payment: "rejected",
    surrender: "accepted",
    document: "accepted",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "pending",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 1,
    payment: "rejected",
    surrender: "pending",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "pending",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 1,
    payment: "rejected",
    surrender: "pending",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "pending",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 1,
    payment: "rejected",
    surrender: "pending",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "rejected",
    document: "rejected",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 1,
    payment: "rejected",
    surrender: "accepted",
    document: "accepted",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "rejected",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 1,
    payment: "rejected",
    surrender: "accepted",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "rejected",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 1,
    payment: "rejected",
    surrender: "accepted",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: "accepted",
    surrender: "rejected",
    document: "pending",
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
];

export function DOActive() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">DO Claims</h1>
        <div>
        <ProfileDropdown/>
        <DataTable title="Active List" data={ACTIVE_DATA}/>;
        </div>
        
      </main>
      <div>
      </div>
    </div>
  )
}

