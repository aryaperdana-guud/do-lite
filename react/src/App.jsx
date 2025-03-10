import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserStore } from "./useUserStore";

import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import { DOActive } from "./pages/DOActiveList.jsx";
import DOClaimView from "./pages/DOClaimView.jsx";
import DOClaimViewAtt from "./pages/DOClaimViewAtt.jsx";
import DOClaimViewQry from "./pages/DOClaimViewQry.jsx";
import DOClaimViewAdt from "./pages/DOClaimViewAdt.jsx";


import { NewBL } from "./pages/NewBL.jsx";
import { DOHistory } from "./pages/DOHistory.jsx";
import { BOLActive } from "./pages/BOLActiveList.jsx";
import { BOLHistory } from "./pages/BOLHistoryList.jsx";
import { ViewBL } from "./pages/ViewBL.jsx";
import { BOLClaim } from "./pages/BOLClaim.jsx";
import AuthGuard from "./components/AuthGuard.jsx";

import { ExtensionActive } from "./pages/DOExtensionActive.jsx";
import { ExtensionHistory } from "./pages/DOExtensionHistory.jsx";
import DOExtGenDetails from "./pages/DOExtGenDetails.jsx";
import DOExtAudit from "./pages/DOExtAudit.jsx";

import EditDOClaim from "./pages/EditDOClaim.jsx";
import EditDOClaimAttachments from "./pages/EditDOClaimAttachments.jsx";
import EditDOClaimAudit from "./pages/EditDOClaimAudit.jsx";
import EditDOClaimQuery from "./pages/EditDOClaimQuery.jsx";

import { MyDOActive } from "./pages/MyDOActive.jsx";
import { MyDOHistory } from "./pages/MyDOHistory.jsx";
import { MyDODetails } from "./pages/MyDODetails.jsx";

import { DoPayment } from "./pages/DoPayment-payment.jsx";
import { DoTransaction } from "./pages/DoPayment-transaction.jsx";
import { DoPaymentPay } from "./pages/DOPayment-Pay.jsx";
import SessionChecker from "./SessionControl/SessionChecker.jsx";
import AutoLogout from "./SessionControl/AutoLogout.jsx";

function App() {
  return (
    <Router>
      <AutoLogout />
      <SessionChecker />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<SignIn />} />

        {/* Other routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/do-claims/active"
          element={
            <AuthGuard>
              <DOActive />
            </AuthGuard>
          }
        />
        <Route
          path="/do-claims/history"
          element={
            <AuthGuard>
              <DOHistory />
            </AuthGuard>
          }
        />

        <Route
          path="/bol/newbl"
          element={
            <AuthGuard>
              <NewBL />
            </AuthGuard>
          }
        />
        <Route
          path="/bol/history"
          element={
            <AuthGuard>
              <BOLHistory />
            </AuthGuard>
          }
        />
        <Route
          path="/bol/active"
          element={
            <AuthGuard>
              <BOLActive />
            </AuthGuard>
          }
        />
        <Route
          path="/bol/active/claim"
          element={
            <AuthGuard>
              <BOLClaim />
            </AuthGuard>
          }
        />
        <Route
          path="/bol/active/view/:id"
          element={
            <AuthGuard>
              <ViewBL />
            </AuthGuard>
          }
        />

        <Route
          path="/do-extension/active"
          element={
            <AuthGuard>
              <ExtensionActive />
            </AuthGuard>
          }
        />
        <Route
          path="/do-extension/history"
          element={
            <AuthGuard>
              <ExtensionHistory />
            </AuthGuard>
          }
        />
        <Route
          path="/my-do/active"
          element={
            <AuthGuard>
              <MyDOActive />
            </AuthGuard>
          }
        />
        <Route
          path="/my-do/history"
          element={
            <AuthGuard>
              <MyDOHistory />
            </AuthGuard>
          }
        />
        <Route
          path="/my-do/active/details"
          element={
            <AuthGuard>
              <MyDODetails />
            </AuthGuard>
          }
        />

        <Route
          path="/do-claim-view/:id"
          element={<DOClaimView/>}
        />
        <Route
          path="/do-claim-view-att/:id"
          element={<DOClaimViewAtt/>}
        />
        <Route
          path="/do-claim-view-query/:id"
          element={<DOClaimViewQry/>}
        />

        <Route
          path="/do-claim-view-audit/:id"
          element={<DOClaimViewAdt/>}
        />

        <Route
          path="/edit-do-extension/GenDetails/:id"
          element={<DOExtGenDetails />}
        />
        <Route
          path="/edit-do-extension/Audit/:id"
          element={
            <AuthGuard>
              <DOExtAudit />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-do-claim/:id"
          element={
            <AuthGuard>
              <EditDOClaim />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-do-claim-attachments/:id"
          element={
            <AuthGuard>
              <EditDOClaimAttachments />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-do-claim-query/:id"
          element={
            <AuthGuard>
              <EditDOClaimQuery />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-do-claim-audit/:id"
          element={
            <AuthGuard>
              <EditDOClaimAudit />
            </AuthGuard>
          }
        />
        <Route
          path="/do-payment/payment"
          element={
            <AuthGuard>
              <DoPayment />
            </AuthGuard>
          }
        />
        <Route
          path="/do-payment/payment/pay"
          element={
            <AuthGuard>
              <DoPaymentPay />
            </AuthGuard>
          }
        />
        <Route
          path="/do-payment/transactions"
          element={
            <AuthGuard>
              <DoTransaction />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
