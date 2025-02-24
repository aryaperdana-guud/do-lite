import { Typography } from "@mui/material"
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import "./DOActiveList.css"
import React from "react"

export function BOLClaim() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">Bill of Ladings</h1>
        <div>
        {/* content */}
        {/* New Claim Job */}
            <div className="container">
                <div className="header">
                    <h2 className="title">Claim Bill of Ladings</h2>
                </div>
                <div className="table">


                </div>
                <div className="footer">

                </div>



            </div>
        </div>
        
      </main>
      <div>
      </div>
    </div>
  )
}

