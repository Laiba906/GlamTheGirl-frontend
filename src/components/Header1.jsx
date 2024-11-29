import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import from react-router-dom

const Header = () => {
  const navigate = useNavigate(); // useNavigate from react-router-dom

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login"); // Navigate to login page
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-lg font-bold">Auth App</h1>
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">Login</Link> {/* Using Link from react-router-dom */}
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
