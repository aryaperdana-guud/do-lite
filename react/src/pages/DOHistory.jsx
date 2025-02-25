import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import "./DOHistory.css"
import React from "react"
import {DataTable} from '../components/TableList/DOTable.jsx'
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const HISTORY_DATA = [
  
];

export function DOHistory() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">DO Claims</h1>
        <div>
        <ProfileDropdown/>
        <DataTable title="History List" data={HISTORY_DATA}/>;
        </div>
        
      </main>
      <div>
      </div>
    </div>
  )
}

