import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { logout } from "../../../redux/user/userSlice";
import { useDispatch } from "react-redux";

import { Link, Navigate } from "react-router-dom";
export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/admin">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Paneli Adminit
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* <Nav.Link href="http://localhost:3000/admin/">
                  Faqja Kryesore
                </Nav.Link> */}
                <Link to="/admin" id="offcanvasNavbarDropdown">
                  Faqja Kryesore
                </Link>
                {/* <Link href="/admin/jobs" id="offcanvasNavbarDropdown">
                  <a>Punët</a>
                </Link> */}
                <NavDropdown title="Punët" id="offcanvasNavbarDropdown">
                  <Link to="/admin">Lista</Link>
                  {/* <Link href="/admin/jobs/create">Shto</Link> */}
                </NavDropdown>
                {/* <NavDropdown title="Punët" id="offcanvasNavbarDropdown">
                  <Link href="/admin/jobs">Lista</Link>
                  <br></br>
                </NavDropdown> */}
                <NavDropdown title="Kategoritë" id="offcanvasNavbarDropdown">
                  <Link to="/admin">Lista</Link>
                  <br></br>
                  <Link to="/admin">Shto</Link>
                </NavDropdown>
              </Nav>

              <Nav.Link
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("token");
                  <Navigate to="/" />;
                }}
              >
                Dil prej sistemi
              </Nav.Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
