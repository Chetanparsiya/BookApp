import {
  faSignInAlt,
  faSignOut,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
const UserList = ({auth}) => (
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
      <Link to={"/"} onClick ={() => auth.signOut()} className="nav-link">
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
  const auth = useAuth()
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to={"/"} className="navbar-brand">
            Book App
          </Link>
          {auth.isLoggedIn ? <UserList auth={auth} /> : <GuestList />}
        </Container>
      </Navbar>
    </div>
  );
}
