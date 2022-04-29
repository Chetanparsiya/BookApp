import React, { useState, useEffect } from "react";
import { Card, Container, Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSave, faPlusSquare , faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
export default function AddBook() {
  let initalState = {
    id: '',
    title:'', 
    isbnNumber: '',
    author: '',
    price: '',
    language: '',
    coverPhotoUrl: ''
  }
  let { id } = useParams();
  const [inputs, setInputs] = useState(initalState);  
  const navigate = useNavigate();

  const reset = () =>  {
    setInputs(initalState);
  }

  useEffect(()=> {
    if(id!==undefined){
      axios
      .get(`http://localhost:8080/api/v1/books/${id}`)
      .then((res) => setInputs(res.data));
    }
  },[id])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
   if(id===undefined)
    axios.post("http://localhost:8080/api/v1/books/", inputs).then((res) => {
     navigate('/books', {state:{status: true,firstTime: true} })
    })
    else {
      axios.put(`http://localhost:8080/api/v1/books/${id}`, inputs).then((res) => {
     navigate('/books', {state:{status: true,firstTime: true} })
    })
    }
    
     
    
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
    console.log(inputs);
  };
  return (
    <>
      <Container>
        <Card className="border border-dark bg-dark text-white mt-5">
          <Card.Header className="h1">
            <FontAwesomeIcon icon={faPlusSquare} />
            {id===undefined ? "Add Book":"Update Book Details"}
          </Card.Header>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Row>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="title"
                    value={inputs.title}
                    className="bg-dark text-white"
                    placeholder="Enter Book Title"
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    onChange={handleInputChange}
                    value={inputs.author}
                    className="bg-dark text-white"
                    placeholder="Enter Book Author"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Cover Photo Url</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.coverPhotoUrl}
                    className="bg-dark text-white"
                    name="coverPhotoUrl"
                    placeholder="Enter Cover Photo Url"
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>ISBN Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="isbnNumber"
                    value={inputs.isbnNumber}
                    onChange={handleInputChange}
                    className="bg-dark text-white"
                    placeholder="Enter ISBN Author"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    className="bg-dark text-white"
                    name="price"
                    value={inputs.price}
                    placeholder="Enter Book Price"
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="language"
                    value={inputs.language}
                    className="bg-dark text-white"
                    placeholder="Enter Language"
                  />
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right"}}>
              <Button variant="success" type="submit" className="mx-3">
                <FontAwesomeIcon icon={faSave} /> {id===undefined ? "Submit" :"Update"}
              </Button>
              <Button variant="success" onClick={reset}>
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </>
  );
}
