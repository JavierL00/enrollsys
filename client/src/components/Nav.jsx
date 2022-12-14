import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className={"text-decoration-none text-dark"}>
          <Navbar.Brand>
            I.E. PMU
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/roles"} className={"text-decoration-none text-dark"}>
                Roles
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={"/users"} className={"text-decoration-none text-dark"}>
                Usuarios
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={"/students"} className={"text-decoration-none text-dark"}>
                Estudiantes
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={"/enrollments"} className={"text-decoration-none text-dark"}>
                Matriculas
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
