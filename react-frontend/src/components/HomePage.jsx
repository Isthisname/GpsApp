// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Welcome to Your App</h1>
          <p>This is your homepage where you can...</p>
          <ul>
            <li>View important information</li>
            <li>Navigate to different sections</li>
            <li>Perform various actions</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
