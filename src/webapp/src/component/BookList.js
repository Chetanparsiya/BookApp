import React from "react";
import { Card, Container, Table } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'

export default function BookList() {
  return (
    <Container>
    <Card className="border border-dark bg-dark text-white">
      <Card.Header ><FontAwesomeIcon  icon={faList} />Book List</Card.Header>
      <Card.Body>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Isbn Numbers</th>
              <th>Price</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    </Container>
  );
}
