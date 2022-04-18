import React,{useState} from "react";
import { Card, Container, Form, Button , Row,Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faPlusSquare} from '@fortawesome/free-solid-svg-icons'

export default function AddBook() {
  const[inputs, setInputs] = useState({})
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted", inputs)
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    console.log(inputs)
  }
  return (
    <>
      <Container>
        <Card className="border border-dark bg-dark text-white mt-5">
          <Card.Header className="h1"><FontAwesomeIcon  icon={faPlusSquare}/>Add Book</Card.Header>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Row>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="title"
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
                    placeholder="Enter Book Price"
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="language"
                    className="bg-dark text-white"
                    placeholder="Enter Language"
                  />
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{"textAlign": "right"}}>
              <Button variant="success" type="submit">
              <FontAwesomeIcon  icon={faSave}/> Submit
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </>
  );
}
