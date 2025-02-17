import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import "./DOActiveList.css"
import React from "react"
import {ActiveListsTable} from '../components/TableList/DOActive.jsx'

export function DOActive() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">DO Claims</h1>
        <div>
            <ActiveListsTable />
        </div>
        
      </main>
      <div>
      </div>
    </div>
  )
}

