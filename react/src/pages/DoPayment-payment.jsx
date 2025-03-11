import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import PaymentTable from "../components/TableList/PaymentTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

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
          <PaymentTable
            title="Payment"
            apiUrl="https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/job/ckConfirmedJobs/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=submittedDate&iColumns=1"
          />
        </div>
      </main>
      <div></div>
    </div>
  );
}
