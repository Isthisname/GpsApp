import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomSidebar from "../../components/sidebar/customsidebar";
import ReactDOM from "react-dom";
import Sidebar from "../../components/sidebar/Sidebar";

const HomePage = () => {
  return (
    <Container fluid>
      <Sidebar></Sidebar>
      <Row>
        <Col xs={3} md={2} lg={2}></Col>
        <Col>
          <h1>Welcome to Your App</h1>
          <p>This is your homepage where you can...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
