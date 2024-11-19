
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import HomePage from "../pages/HomePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logout from "../components/Logout"
const App = () => {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Application Routes */}
      <Routes>
        {/* Home Page with Slider */}
        <Route path="/" element={<HomePage />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<HomePage/>} />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
