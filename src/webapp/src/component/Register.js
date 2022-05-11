import {
  faEnvelope,
  faSignInAlt,
  faLock,
  faUserPlus,
  faUndo,
  faUser,
  faContactCard,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Row, Col, Form,Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
export default function Register() {
  const initialState = {name: '', email : '', password: '', contact:''}
  const [userRegistrationDetails, setUserRegistrationsDetails] = useState(initialState)
  const reset = () => {
    setUserRegistrationsDetails(initialState);
  }

  const register = () => {
    axios.post("http://localhost:8080/api/v1/user/register", userRegistrationDetails).then(res => console.log(res))
  }

  const onChange = (e) => {
    setUserRegistrationsDetails({...userRegistrationDetails, [e.target.name]: e.target.value})
    console.log(userRegistrationDetails)
  }
  return (
    <>
      <Row className="justify-content-md-center mt-3">
        <Col xs={3}>
          <Card className="border border-dark bg-dark text-white">
            <Card.Header>
              <FontAwesomeIcon icon={faUserPlus} />{'    '}
              Register
            </Card.Header>
            <Card.Body>
            <Row>
                <Form.Group>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon = {faUser} /></InputGroup.Text>
                    <FormControl
                      placeholder="Enter Name"
                      name="name"
                      type="text"
                      value={userRegistrationDetails.name}
                      required
                      onChange = {onChange}
                      autoComplete="off"
                      className="bg-dark text-white"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  </Form.Group>
                  </Row>
              <Row>
                <Form.Group>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon = {faEnvelope} /></InputGroup.Text>
                    <FormControl
                      placeholder="Enter Email Address"
                      name="email"
                      type="text"
                      value={userRegistrationDetails.email}
                      required
                      onChange = {onChange}
                      autoComplete="off"
                      className="bg-dark text-white"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group >
                  <InputGroup className="mb-3">
                    
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon = {faLock} /></InputGroup.Text>
                    <FormControl
                      placeholder="Enter Password"
                      name="password"
                      onChange={onChange}
                      type="password"
                      value={userRegistrationDetails.password}
                      required
                      autoComplete="off"
                      className="bg-dark text-white"
                      
                    />
                  </InputGroup>
                </Form.Group >
              </Row>
              <Row>
                <Form.Group>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon = {faPhone} /></InputGroup.Text>
                    <FormControl
                      placeholder="Enter Contact Number"
                      name="contact"
                      type="text"
                      value={userRegistrationDetails.contact}
                      required
                      onChange = {onChange}
                      autoComplete="off"
                      className="bg-dark text-white"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  </Form.Group>
                  </Row>
            </Card.Body>
            <Card.Footer style={{textAlign :"right"}} className="m-2">
            <Button  size="sm" onClick={register} variant="success" disabled={userRegistrationDetails.name.length===0 || userRegistrationDetails.email.length===0 || userRegistrationDetails.password.length === 0 || userRegistrationDetails.contact.length === 10}>
                <FontAwesomeIcon icon={faUserPlus} />Register
              </Button>{' '}
              <Button size="sm" onClick={reset} variant="info" disabled={userRegistrationDetails.name.length===0 && userRegistrationDetails.email.length===0 && userRegistrationDetails.password.length === 0 && userRegistrationDetails.contact.length === 0}>
                <FontAwesomeIcon  icon={faUndo}/>Reset
              </Button>
              
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  )
}
