import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<SignIn />} />

        {/* Other routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
