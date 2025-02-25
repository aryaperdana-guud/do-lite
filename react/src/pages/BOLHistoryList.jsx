import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import "./DOActiveList.css"
import React from "react"
import {BOLTable} from '../components/TableList/BOLTable.jsx'
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";


const ACTIVE_DATA = [
  
];


export function BOLHistory() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">Bill of Ladings</h1>
        <div>
        <ProfileDropdown/>
        <BOLTable title="History List" data={ACTIVE_DATA}/>;
        </div>
        
      </main>
      <div>
      </div>
    </div>
  )
}

