import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import "./DOActiveList.css"
import React from "react"
import {BOLTable} from '../components/TableList/BOLTable.jsx'
import ProfileDropdown from '../components/ProfileBar/Profile.jsx'



const ACTIVE_DATA = [
    {
      "id": 1,
      "blNo": "MEDU/123456",
      "containerNo": "MEDU/123456/890",
      "shippingLine": "SHIPPING LINE 1",
      "submittedDate": "05/02/2024 18:22:34",
      "submittedBy": "CARGO OWNER 1",
      "assignedJobNo": "JOB001",
      "assignedDate": "05/02/2024",
      "status": "pending"
    },
    {
      "id": 2,
      "blNo": "MEDU/789012",
      "containerNo": "MEDU/789012/345",
      "shippingLine": "SHIPPING LINE 2",
      "submittedDate": "05/02/2024 19:15:22",
      "submittedBy": "CARGO OWNER 2",
      "assignedJobNo": "JOB002",
      "assignedDate": "05/02/2024",
      "status": "accepted"
    },
    {
      "id": 3,
      "blNo": "MEDU/345678",
      "containerNo": "MEDU/345678/901",
      "shippingLine": "SHIPPING LINE 1",
      "submittedDate": "05/02/2024 20:30:15",
      "submittedBy": "CARGO OWNER 3",
      "assignedJobNo": "JOB003",
      "assignedDate": "05/02/2024",
      "status": "rejected"
    },
    {
      "id": 4,
      "blNo": "MEDU/901234",
      "containerNo": "MEDU/901234/567",
      "shippingLine": "SHIPPING LINE 3",
      "submittedDate": "05/02/2024 21:45:10",
      "submittedBy": "CARGO OWNER 1",
      "assignedJobNo": "JOB004",
      "assignedDate": "05/02/2024",
      "status": "accepted"
    },
    {
      "id": 5,
      "blNo": "MEDU/567890",
      "containerNo": "MEDU/567890/123",
      "shippingLine": "SHIPPING LINE 2",
      "submittedDate": "05/02/2024 22:10:45",
      "submittedBy": "CARGO OWNER 4",
      "assignedJobNo": "JOB005",
      "assignedDate": "05/02/2024",
      "status": "pending"
    },
    {
      "id": 6,
      "blNo": "MEDU/234567",
      "containerNo": "MEDU/234567/890",
      "shippingLine": "SHIPPING LINE 1",
      "submittedDate": "05/02/2024 23:05:30",
      "submittedBy": "CARGO OWNER 2",
      "assignedJobNo": "JOB006",
      "assignedDate": "05/02/2024",
      "status": "rejected"
    },
    {
      "id": 7,
      "blNo": "MEDU/890123",
      "containerNo": "MEDU/890123/456",
      "shippingLine": "SHIPPING LINE 3",
      "submittedDate": "06/02/2024 00:20:15",
      "submittedBy": "CARGO OWNER 5",
      "assignedJobNo": "JOB007",
      "assignedDate": "06/02/2024",
      "status": "pending"
    },
    {
      "id": 8,
      "blNo": "MEDU/456789",
      "containerNo": "MEDU/456789/012",
      "shippingLine": "SHIPPING LINE 2",
      "submittedDate": "06/02/2024 01:35:20",
      "submittedBy": "CARGO OWNER 1",
      "assignedJobNo": "JOB008",
      "assignedDate": "06/02/2024",
      "status": "accepted"
    },
    {
      "id": 9,
      "blNo": "MEDU/012345",
      "containerNo": "MEDU/012345/678",
      "shippingLine": "SHIPPING LINE 1",
      "submittedDate": "06/02/2024 02:50:25",
      "submittedBy": "CARGO OWNER 3",
      "assignedJobNo": "JOB009",
      "assignedDate": "06/02/2024",
      "status": "rejected"
    },
    {
      "id": 10,
      "blNo": "MEDU/678901",
      "containerNo": "MEDU/678901/234",
      "shippingLine": "SHIPPING LINE 3",
      "submittedDate": "06/02/2024 03:15:40",
      "submittedBy": "CARGO OWNER 4",
      "assignedJobNo": "JOB010",
      "assignedDate": "06/02/2024",
      "status": "accepted"
    }
];


export function BOLActive() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <div className="top-bar">
          <div className="left">
            <h1 className="Title">Bill of Ladings</h1>
          </div>  
        </div>
        <div>
            <ProfileDropdown/>
            <BOLTable title="Active List" data={ACTIVE_DATA}/>;
        </div>
        
      </main>
      <div>
      </div>
    </div>
  )
}

