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
                <Link
                  to="/admin"
                  id="offcanvasNavbarDropdown"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Faqja Kryesore
                </Link>
                <br></br>
                <NavDropdown title="Punët" id="offcanvasNavbarDropdown">
                  <Link
                    to="/admin/jobs"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Lista
                  </Link>
                </NavDropdown>

                <NavDropdown title="Kategoritë" id="offcanvasNavbarDropdown">
                  <Link
                    to="/admin/categories"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    Lista
                  </Link>
                  <br></br>
                  <Link
                    to="/admin/categories/create"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Shto
                  </Link>
                </NavDropdown>
                <br></br>

                <Link
                  to="/admin/settings"
                  id="offcanvasNavbarDropdown"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Konfigurimet
                </Link>
              </Nav>
              <br></br>

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
