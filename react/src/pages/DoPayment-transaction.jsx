import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import TransactionTable from "../components/TableList/TransactionTable.jsx";

export function DoTransaction() {
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
          <TransactionTable
            title="Transaction"
            apiUrl="
https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/payment/paymentTxn/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=ptxDtCreate&mDataProp_1=history&sSearch_1=default&iColumns=2"
          />
        </div>
      </main>
      <div></div>
    </div>
  );
}
