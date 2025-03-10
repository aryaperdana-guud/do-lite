import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import BOLClaimTable from "../components/TableList/BOLClaimTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

export function BOLClaim() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <div className="top-bar">
          <div className="left">
            <h1 className="Title">Bill of Ladings</h1>
          </div>
        </div>
        <div className="content">
          <ProfileDropdown />
          <BOLClaimTable />
        </div>
      </main>
      <div></div>
    </div>
  );
}
