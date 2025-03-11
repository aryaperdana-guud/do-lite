import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOHistory.css";
import React from "react";
import { DOTable } from "../components/TableList/DOTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

export function DOHistory() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">DO Claims</h1>
        <div>
          <ProfileDropdown />
          <DOTable
            title="History List"
            apiUrl={
              "https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/job/ckJobDoClaim/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=jobDtLupd&mDataProp_1=history&sSearch_1=history&iColumns=2"
            }
          />
        </div>
      </main>
      <div></div>
    </div>
  );
}
