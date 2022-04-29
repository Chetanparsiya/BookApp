import React, { useState, useEffect } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import { useLocation,Link, useNavigate } from "react-router-dom";
export default function BookList() {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState({ type: "", message: "" });
  const location = useLocation();
  const navigate = useNavigate();
  const [firstTime, setFirstTime] = useState(true)
  //const
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/books/")
      .then((res) => setBooks(res.data));
    debugger;
  }, []);

  useEffect(() => {
    debugger;
    console.log("Chetan", location);
    if (location?.state?.status && firstTime) {
      setShow(true);
      setFirstTime(false)
     
    }
    setInterval(() => setShow(false), 3000);
    setAction({ type: "success", message: "Book Saved Successfully" });
  }, [location?.state?.status]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/v1/books/${id}`).then((res) => {
      setBooks(books.filter((r) => r.id !== id));
      setShow(true);
      setInterval(() => setShow(false), 3000);
      setAction({ type: "danger", message: "Book Deleted Successfully" });
    });
  };

  return (
    <>
      <div style={{ display: show ? "block" : "none" }}>
        {<MyToast status={show} action={action} />}
      </div>
      <Container>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} />
            Book List
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Isbn Numbers</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Language</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr align="center">
                    <td colSpan={6}>No Books Data Available</td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.isbnNumber}</td>
                      <td>{book.author}</td>
                      <td>{book.price}</td>
                      <td>{book.language}</td>
                      <td>
                        <Link
                          to={"/edit/"+book.id}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(book.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
