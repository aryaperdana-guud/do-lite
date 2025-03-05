import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import PaymentDetails from "../components/PaymentDetails.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

export function DoPaymentPay() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <div className="top-bar">
          <div className="left">
            <h1 className="Title">DO Payment</h1>
          </div>
        </div>
        <div>
          <ProfileDropdown />
          <PaymentDetails />
        </div>
      </main>
      <div></div>
    </div>
  );
}
