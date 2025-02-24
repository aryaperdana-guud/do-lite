import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import { DOActive } from './pages/DOActiveList.jsx';
import { NewBL } from './pages/NewBL.jsx';
import { DOHistory } from './pages/DOHistory.jsx';
import { BOLActive } from './pages/BOLActiveList.jsx';
import { BOLHistory } from './pages/BOLHistoryList.jsx';
import { ViewBL } from './pages/ViewBL.jsx';
import { BOLClaim } from './pages/BOLClaim.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<SignIn />} />

        {/* Other routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/do-claims/active" element={<DOActive />} />
        <Route path="/do-claims/history" element={<DOHistory />} />
        <Route path="/bol/newbl" element={<NewBL />} />
        <Route path="/bol/history" element={<BOLHistory />} />
        <Route path="/bol/active" element={<BOLActive />} />
        <Route path="/bol/claim" element={<BOLClaim />} />
        <Route path="/bol/active/view/:id" element={<ViewBL />}/>
      </Routes>
    </Router>
  );
}

export default App;
