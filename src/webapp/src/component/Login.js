import {
  faEnvelope,
  faSignInAlt,
  faLock,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Form,
  Alert,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const initialState = { email: "", password: "" , error: ""};
  const [userLoginCredential, setUserLoginCredential] = useState(initialState);
  const reset = () => {
    setUserLoginCredential(initialState);
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': window.localStorage.getItem("token")
  }


  const login = () => {
    debugger
    axios.post("http://localhost:8080/api/v1/user/authenticate", userLoginCredential).then(res =>{ window.localStorage.setItem("token", res.data.token); navigate('/books')})
  
 }

  const onChange = (e) => {
    setUserLoginCredential({
      ...userLoginCredential,
      [e.target.name]: e.target.value,
    });
    console.log(userLoginCredential);
  };
  return (
    <>
      
      <Row className="justify-content-md-center mt-3">
        <Col xs={3}>
        {true&& <Alert  key='danger' variant='danger'> Invalid Login Credentail</Alert>}
          <Card className="border border-dark bg-dark text-white">
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} />
              Login
            </Card.Header>
            <Card.Body>
              <Row>
                <Form.Group>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Enter Email Address"
                      name="email"
                      type="text"
                      value={userLoginCredential.email}
                      required
                      onChange={onChange}
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
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Enter Password"
                      name="password"
                      onChange={onChange}
                      type="password"
                      value={userLoginCredential.password}
                      required
                      autoComplete="off"
                      className="bg-dark text-white"
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }} className="m-2">
              <Button
                size="sm"
                variant="success"
                disabled={
                  userLoginCredential.email.length === 0 ||
                  userLoginCredential.password.length === 0
                }
                onClick={login}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                Login
              </Button>{" "}
              <Button
                size="sm"
                onClick={reset}
                variant="info"
                disabled={
                  userLoginCredential.email.length === 0 &&
                  userLoginCredential.password.length === 0
                }
              >
                <FontAwesomeIcon icon={faUndo} />
                Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}
