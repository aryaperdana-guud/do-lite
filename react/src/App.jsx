import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import {DOActive} from './pages/DOActiveList.jsx';
import { NewBL } from './pages/NewBL.jsx';
import {DOHistory} from './pages/DOHistory.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<SignIn />} />

        {/* Other routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/do-claims/active" element={<DOActive/>} />
        <Route path="/do-claims/history" element={<DOHistory/>} />
        <Route path="/bol/newbl" element={<NewBL/>} />
      </Routes>
    </Router>
  );
}

export default App;
