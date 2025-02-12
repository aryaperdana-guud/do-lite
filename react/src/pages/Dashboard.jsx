import { NavigationBar } from "../components/NavigationBar"
import "./Dashboard.css"
import React from "react"

export function Dashboard() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">Dashboard</h1>
      </main>
      <div>
      </div>
    </div>
  )
}

