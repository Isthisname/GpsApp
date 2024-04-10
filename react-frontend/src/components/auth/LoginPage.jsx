import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { Form, Button, Container } from "react-bootstrap";
import { login } from "../../utils/api"; // Import the login function from api.js
import * as auth from "../../utils/auth"; // Import all from auth.js for token management

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }); // Use the login function from api.js
      if (response && response.token) {
        // Ensure response exists and contains token
        auth.saveToken(response.token); // Save the token using functions from auth.js
        navigate("/"); // Navigate to the homepage upon successful login
      } else {
        // Handle case where login is successful but no token is returned
        console.error("Login successful but no token received");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, implement more detailed error handling or user feedback here
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
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

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
