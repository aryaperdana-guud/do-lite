import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import MyDOTable from "../components/TableList/MyDOTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const History_Data = [];
export function MyDOHistory() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">My DO</h1>
        <div>
          <ProfileDropdown />
          <MyDOTable title="History List" data={History_Data} />
        </div>
      </main>
      <div></div>
    </div>
  );
}
