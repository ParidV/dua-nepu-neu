// Importing files from Material-UI
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const session = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dua nëpu</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Faqja Kryesore</Nav.Link>
            <Nav.Link href="#features">Kërko</Nav.Link>
            <Nav.Link href="#pricing">Kontakt</Nav.Link>
          </Nav>

          {isAuth ? (
            <Nav className="ml-auto">
              <Nav.Link href="#home">{session.name}</Nav.Link>
              <Nav.Link href="#features">Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          )}

          {/* <Nav className="ml-auto">
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#features">Register</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
    </>
  );
}
