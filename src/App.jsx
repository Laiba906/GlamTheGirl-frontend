import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SalonListing from './pages/SalonListing';
import MainContent from './pages/MainContent';
import SignupUser from './components/SignupUser';
import SignupSalon from './components/SignupSalon';
import LoginUser from './components/LoginUser';
import LoginSalon from './components/LoginSalon';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* HomePage is the layout that wraps the entire application */}
          <Route path="/" element={<HomePage />}>
            <Route path="/signup/user" element={<SignupUser />} />
            <Route path="/signup/salon" element={<SignupSalon />} />
            <Route path="/login/user" element={<LoginUser />} />
            <Route path="/login/salon" element={<LoginSalon />} />
            {/* Default HomePage content (like MainContent) */}
            <Route index element={<MainContent />} />
            {/* SalonListing component for /salondetails route */}
            <Route path="/salondetails" element={<SalonListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
