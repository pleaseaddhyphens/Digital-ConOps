import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

const indexNavbar = () => {

  return (
    <>
    <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">ECC correction algorithm</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <NavDropdown title="Options" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Tool 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Tool 2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Tool 3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default indexNavbar;
