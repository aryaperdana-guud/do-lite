import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import { DOTable } from "../components/TableList/DOTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

export function DOActive() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">DO Claims</h1>
        <div>
          <ProfileDropdown />
          <DOTable
            title="Active List"
            apiUrl={
              "https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/job/ckJobDoClaim/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&mDataProp_0=jobStateDocVerfiy&mDataProp_1=history&sSearch_1=default&iColumns=2"
            }
          />
          ;
        </div>
      </main>
      <div></div>
    </div>
  );
}
