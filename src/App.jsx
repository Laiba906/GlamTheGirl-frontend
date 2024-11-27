import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupUser from './components/SignupUser';
import SignupSalon from './components/SignupSalon';
import LoginUser from './components/LoginUser';
import LoginSalon from './components/LoginSalon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup/user" element={<SignupUser />} />
        <Route path="/signup/salon" element={<SignupSalon />} />
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/login/salon" element={<LoginSalon />} />
      </Routes>
    </Router>
  );
}

export default App;
