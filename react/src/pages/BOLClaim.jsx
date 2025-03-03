import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import BOLClaimTable from "../components/TableList/BOLClaimTable.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const dummyData = [
  {
    id: 1,
    blNo: "MEDUJI2345",
    containerNo: "MSDU1234567890",
    shippingLine: "Maersk Line",
    state: "NEW",
  },
  {
    id: 2,
    blNo: "COSU8765432",
    containerNo: "CSNU6543210987",
    shippingLine: "COSCO Shipping",
    state: "NEW",
  },
  {
    id: 3,
    blNo: "HLCU4567890",
    containerNo: "HLXU9087654321",
    shippingLine: "Hapag-Lloyd",
    state: "NEW",
  },
  {
    id: 4,
    blNo: "ONEY7890123",
    containerNo: "ONEY1234567890",
    shippingLine: "Ocean Network Express",
    state: "NEW",
  },
  {
    id: 5,
    blNo: "SEGU5678901",
    containerNo: "SEGU2345678901",
    shippingLine: "Evergreen Marine",
    state: "NEW",
  },
];

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
          <BOLClaimTable data={dummyData} />
        </div>
      </main>
      <div></div>
    </div>
  );
}
