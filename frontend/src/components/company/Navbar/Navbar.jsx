import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CLinkNav, CLink } from "../../CustomLink";
function NavBar() {
  const session = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isLoggedIn);
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <CLinkNav to="/company">
            {session.name + " " + session.surname}
          </CLinkNav>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <CLink to="/company">Home</CLink>
            </Nav.Link>
            <NavDropdown title="Jobs" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <CLink to="/company/jobs/">Lista</CLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <CLink to="/company/jobs/create">Krijo Punë</CLink>
              </NavDropdown.Item>
            </NavDropdown>{" "}
            <NavDropdown title="Applications" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <CLink to="#">Lista</CLink>
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          {/* <Nav.Link
            onClick={() =>
              signOut({
                callbackUrl: `/`,
              })
            }
          >
            Logout
          </Nav.Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
