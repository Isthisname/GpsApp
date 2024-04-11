import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import { isAuthenticated } from "./utils/auth"; // Import isAuthenticated function


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated()); // Update isLoggedIn state
    };
    checkAuthStatus();
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false after logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />

        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />}
        />

        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/"
          element={
            isLoggedIn ? <HomePage onLogout={handleLogout} /> : <WelcomePage />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
