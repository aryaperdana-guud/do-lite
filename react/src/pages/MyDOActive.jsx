import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import MyDOTable from "../components/TableList/MyDOTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const Active_Data = [
  // {
  //   id: 1,
  //   doNumber: "DOJF1234567890",
  //   consignee: "Cargo Owner 1",
  //   vesselName: "MSC CORDELIA III",
  //   voyageNumber: "HB225R",
  //   blNumber: "MEDUU12345",
  //   blType: "EXPRESS",
  //   numberOfContainers: 2,
  // },
  // {
  //   id: 2,
  //   doNumber: "DOJK9876543210",
  //   consignee: "Fast & Furious Logistics",
  //   vesselName: "SS NEVER LATE",
  //   voyageNumber: "TT786Q",
  //   blNumber: "HMMHY54321",
  //   blType: "REGULAR",
  //   numberOfContainers: 4,
  // },
  // {
  //   id: 3,
  //   doNumber: "DOZY555888999",
  //   consignee: "Lazy Panda Shipping",
  //   vesselName: "MV SNOWY TURTLE",
  //   voyageNumber: "CH99X",
  //   blNumber: "COSCO123987",
  //   blType: "SEA WAYBILL",
  //   numberOfContainers: 1,
  // },
  // {
  //   id: 4,
  //   doNumber: "DOTT1122334455",
  //   consignee: "Budget Cargo Movers",
  //   vesselName: "MV BARGAIN HUNTER",
  //   voyageNumber: "BUDG33T",
  //   blNumber: "ONEPI67890",
  //   blType: "EXPRESS",
  //   numberOfContainers: 3,
  // },
  // {
  //   id: 5,
  //   doNumber: "DOXO333666999",
  //   consignee: "Overnight Ocean Express",
  //   vesselName: "SS INSOMNIA",
  //   voyageNumber: "NOZZZ5",
  //   blNumber: "EVERG12456",
  //   blType: "REGULAR",
  //   numberOfContainers: 5,
  // },
];

export function MyDOActive() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">My DO</h1>
        <div>
          <ProfileDropdown />
          <MyDOTable title="Active List" data={Active_Data} />
        </div>
      </main>
      <div></div>
    </div>
  );
}
