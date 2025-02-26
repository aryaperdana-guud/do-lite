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
import AuthGuard from "./components/AuthGuard.jsx";
import { UserProvider } from "./components/UserContext.jsx";
import { ExtensionActive } from './pages/DOExtensionActive.jsx';
import { ExtensionHistory } from './pages/DOExtensionHistory.jsx';
import { ExtensionEdit } from './pages/DOExtensionedit.jsx';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<SignIn />} />

          {/* Other routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/do-claims/active" element={<AuthGuard><DOActive /></AuthGuard>} />
          <Route path="/do-claims/history" element={<AuthGuard><DOHistory /></AuthGuard>} />

          <Route path="/bol/newbl" element={<AuthGuard><NewBL /></AuthGuard>} />
          <Route path="/bol/history" element={<AuthGuard><BOLHistory /></AuthGuard>} />
          <Route path="/bol/active" element={<AuthGuard><BOLActive /></AuthGuard>} />
          <Route path="/bol/claim" element={<AuthGuard><BOLClaim /></AuthGuard>} />
          <Route path="/bol/active/view/:id" element={<AuthGuard><ViewBL /></AuthGuard>}/>

          <Route path="/do-extension/active" element={<AuthGuard><ExtensionActive /></AuthGuard>}/>
          <Route path="/do-extension/history" element={<AuthGuard><ExtensionHistory /></AuthGuard>}/>
          <Route path="/do-extension/active/edit" element={<AuthGuard><ExtensionEdit /></AuthGuard>}/>

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
