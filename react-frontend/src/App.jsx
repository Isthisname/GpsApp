import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import WelcomePage from "./components/WelcomePage";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/welcome" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
