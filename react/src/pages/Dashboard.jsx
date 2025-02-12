import { NavigationBar } from "../components/NavigationBar"
import "./Dashboard.css"

export function Dashboard() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">{/* Main content will go here */}</main>
    </div>
  )
}

