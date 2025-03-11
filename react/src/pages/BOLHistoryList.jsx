import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import { BOLTable } from "../components/TableList/BOLTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

export function BOLHistory() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">Bill of Ladings</h1>
        <div>
          <ProfileDropdown />
          <BOLTable
            title="History List"
            apiUrl={
              "https://cdo-dev-id2.clickargo.com/be/clicdo/api/ck/doi/ckDoBl/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=blDtCreate&mDataProp_1=history&sSearch_1=history&iColumns=2"
            }
          />
        </div>
      </main>
      <div></div>
    </div>
  );
}
