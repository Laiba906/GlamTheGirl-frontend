import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DrawerMenu from '../components/DrawerMenu';
import Footer from '../components/Footer';
import MainContent from './MainContent';
import SalonListing from './SalonListing';
import SignupUser from '../components/SignupUser';
import SignupSalon from '../components/SignupSalon';
import LoginUser from '../components/LoginUser';
import LoginSalon from '../components/LoginSalon';

function HomePage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 = User Panel, 1 = Salon Panel

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  return (
    <div>
      {/* Global Layout Components */}
      <Navbar handleDrawerToggle={handleDrawerToggle} activeTab={activeTab} />
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content Area */}
      <div style={{ marginTop: "70px" }}>
        <Routes>
          {/* Nested Route: This will render the correct content based on the current route */}
          <Route path="*" element={<MainContent />} />{" "}
          {/* Always render nested content here */}
          <Route path="/salondetails" element={<SalonListing />} />
          <Route path="/signup/user" element={<SignupUser />} />
          <Route path="/signup/salon" element={<SignupSalon />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/salon" element={<LoginSalon />} />
        </Routes>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default HomePage;
