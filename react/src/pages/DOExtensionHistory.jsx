import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import { ExtensionTable } from "../components/TableList/ExtensionTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

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
          <ExtensionTable
            title="History List"
            apiUrl={
              "https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/extension/doExt/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=doxId&mDataProp_1=history&sSearch_1=history&iColumns=2"
            }
          />
        </div>
      </main>
      <div></div>
    </div>
  );
}
