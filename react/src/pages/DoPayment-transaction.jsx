import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import "./DOActiveList.css";
import React from "react";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import TransactionTable from "../components/TableList/TransactionTable.jsx";

const ACTIVE_DATA = [
  {
    id: 1,
    status: "accepted",
    paymentId: "TXND0123456789456989",
    billingDate: "11/02/2025",
    amount: "Rp 3,582,010",
    currency: "IDR",
    paymentDate: "11/02/2025",
    paidDate: "11/02/2025",
  },
  {
    id: 2,
    status: "pending",
    paymentId: "TXND0123456789456990",
    billingDate: "10/02/2025",
    amount: "Rp 2,145,750",
    currency: "IDR",
    paymentDate: "10/02/2025",
    paidDate: null,
  },
  {
    id: 3,
    status: "accepted",
    paymentId: "TXND0123456789456991",
    billingDate: "09/02/2025",
    amount: "Rp 5,890,000",
    currency: "IDR",
    paymentDate: "09/02/2025",
    paidDate: "10/02/2025",
  },
  {
    id: 4,
    status: "rejected",
    paymentId: "TXND0123456789456992",
    billingDate: "08/02/2025",
    amount: "Rp 1,250,000",
    currency: "IDR",
    paymentDate: "08/02/2025",
    paidDate: null,
  },
  {
    id: 5,
    status: "accepted",
    paymentId: "TXND0123456789456993",
    billingDate: "07/02/2025",
    amount: "Rp 3,750,500",
    currency: "IDR",
    paymentDate: "07/02/2025",
    paidDate: "08/02/2025",
  },
  {
    id: 6,
    status: "accepted",
    paymentId: "TXND0123456789456994",
    billingDate: "06/02/2025",
    amount: "Rp 4,125,000",
    currency: "IDR",
    paymentDate: "06/02/2025",
    paidDate: "07/02/2025",
  },
  {
    id: 7,
    status: "pending",
    paymentId: "TXND0123456789456995",
    billingDate: "05/02/2025",
    amount: "Rp 2,890,750",
    currency: "IDR",
    paymentDate: "05/02/2025",
    paidDate: null,
  },
  {
    id: 8,
    status: "accepted",
    paymentId: "TXND0123456789456996",
    billingDate: "04/02/2025",
    amount: "Rp 6,450,000",
    currency: "IDR",
    paymentDate: "04/02/2025",
    paidDate: "05/02/2025",
  },
  {
    id: 9,
    status: "rejected",
    paymentId: "TXND0123456789456997",
    billingDate: "03/02/2025",
    amount: "Rp 1,875,250",
    currency: "IDR",
    paymentDate: "03/02/2025",
    paidDate: null,
  },
  {
    id: 10,
    status: "accepted",
    paymentId: "TXND0123456789456998",
    billingDate: "02/02/2025",
    amount: "Rp 3,210,500",
    currency: "IDR",
    paymentDate: "02/02/2025",
    paidDate: "03/02/2025",
  },
];

export function DoTransaction() {
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
          <TransactionTable title="Transaction" data={ACTIVE_DATA} />;
        </div>
      </main>
      <div></div>
    </div>
  );
}
