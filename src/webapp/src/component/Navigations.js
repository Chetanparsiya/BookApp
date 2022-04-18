import React from "react";
import {Navbar, Container,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navigations() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
         <Link to={"/"} className="navbar-brand">Book App</Link>
          <Nav className="me-auto">
            <Link to={"/add-book"} className="nav-link">Add Books</Link>
            <Link to={"/books"} className="nav-link">Books</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
