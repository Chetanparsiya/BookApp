import React from 'react'
import {Navbar, Container,Col} from 'react-bootstrap'


export default function Footer() {
  let fullYear = new Date().getFullYear();
  return (
   <>
    <Navbar fixed = "bottom" bg="dark" variant="dark">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>
            {fullYear}-{fullYear+1} All Right Reserved By Unborn Technologies
          </div>
        </Col>
      </Container>
      </Navbar>
   </>
  )
}
