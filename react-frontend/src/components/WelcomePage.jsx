import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Welcome to Our App!</h1>
      <p>Please sign in or sign up to access the application.</p>
      <div>
        <Link to="/login">Login</Link> {/* Link to the login page */}
        <Link to="/signup">Sign Up</Link> {/* Link to the signup page */}
      </div>
    </div>
  );
};

export default WelcomePage;
