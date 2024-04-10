import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import * as auth from "./utils/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("Checking authentication status...");
    const token = auth.getToken();
    console.log("Token found:", token);
    if (token) {
      setIsLoggedIn(true);
      console.log("User is logged in.");
    } else {
      setIsLoggedIn(false);
      console.log("User is not logged in.");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={isLoggedIn ? <HomePage /> : <WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
