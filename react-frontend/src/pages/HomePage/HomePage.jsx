import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomSidebar from "../../components/sidebar/customsidebar";

const HomePage = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={3} md={2} lg={2}>
          <CustomSidebar />
        </Col>
        <Col>
          <h1>Welcome to Your App</h1>
          <p>This is your homepage where you can...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
