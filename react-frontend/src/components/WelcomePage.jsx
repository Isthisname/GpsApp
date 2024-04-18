import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import image from "../pages/auth/image.jpg"
import { Button } from "react-bootstrap";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.9, // Set opacity to 90%
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Our App!</h1>
        <p>Please sign in or sign up to access the application.</p>
        <div>
          <Link to="/login">
            <Button variant="primary" style={{ marginRight: "10px" }}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
