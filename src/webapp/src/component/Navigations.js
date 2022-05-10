import {
  faSignInAlt,
  faSignOut,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const UserList = () => (
  <>
    <Nav className="me-auto">
      <Link to={"/add-book"} className="nav-link">
        Add Books
      </Link>
      <Link to={"/books"} className="nav-link">
        Books
      </Link>
    </Nav>
    <Nav className="navbar-right">
      <Link to={"logout"} onClick ={() => window.localStorage.clear()} className="nav-link">
        <FontAwesomeIcon icon={faSignOut} /> Logout
      </Link>
    </Nav>
  </>
);

const GuestList = () => (
  <Nav className="navbar-right">
    <Link to={"register"} className="nav-link">
      <FontAwesomeIcon icon={faUserPlus} /> Register
    </Link>
    <Link to={"login"} className="nav-link">
      <FontAwesomeIcon icon={faSignInAlt} /> Login
    </Link>
  </Nav>
);
export default function Navigations() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to={"/"} className="navbar-brand">
            Book App
          </Link>
          {window.localStorage.getItem("token") ? <UserList /> : <GuestList />}
        </Container>
      </Navbar>
    </div>
  );
}
