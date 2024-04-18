import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { login } from "../../utils/api";
import * as auth from "../../utils/auth";
import image from "./image.jpg"; // Import the background image

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      if (response && response.token) {
        auth.saveToken(response.token);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.9, // Set opacity to 70%
      }}
    >
      <Container className="mt-5">
        <div className="card" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
          <div className="card-body">
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Login</h3>
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mb-4" size="lg">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
