import React, { useState } from 'react';
import { Button, Navbar, Nav, Container, Col, Row } from 'react-bootstrap';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper" className={`collapse ${isOpen ? 'show' : ''}`}>
                    <Nav className="flex-column">
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">About</Nav.Link>
                        {/* Add more links as needed */}
                    </Nav>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Navbar className="mb-3" bg="light" expand="lg">
                        <Button variant="primary" onClick={toggleSidebar}>
                            {isOpen ? 'Hide' : 'Show'} Sidebar
                        </Button>
                    </Navbar>
                    <h2>Welcome to the Dashboard</h2>
                    {/* Main content goes here */}
                </Col>
            </Row>
        </Container>
    );
};

export default Sidebar;
