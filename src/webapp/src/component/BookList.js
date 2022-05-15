import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faSortUp,
  faStepForward,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import "./BookList.css"
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export default function BookList() {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState({ type: "", message: "" });
  const location = useLocation();
  const auth = useAuth();
  const [page, setPage] = useState({pageSize: 2, pageNumber:0,totalPages:0,lastPage:false});
  const [sort,setSort] = useState({sortBy:"id", sortDir:"asc"})
  const [sortToggle,setSortToggle] = useState(true)
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/books/?pageSize=${page.pageSize}&&pageNumber=${page.pageNumber}&&sortBy=${sort.sortBy}&&sortDir=${sort.sortDir}`,
        {
          headers: {
            Authorizations: auth.token,
          },
        }
      )
      .then((res) => {
        let { content, ...pageData } = res.data;
        setBooks(content);
        setPage(pageData);
      });
  }, [page.pageNumber, page.pageSize, books.length, sort.sortDir]);
  console.log(books);
  console.log("cehtan", page);
  useEffect(() => {
    if (location?.state?.status) {
      setShow(true);
    }
    setInterval(() => setShow(false), 3000);
    setAction({ type: "success", message: "Book Saved Successfully" });
  }, [location?.state?.status]);
  const pageNumCss = {
    width: "45px",
    border: "1px solid #17A2B8",
    textAlign: "center",
    fontWeight: "bold",
  };

  const handleToggle = (field) => {
    setSortToggle(!sortToggle)
    setSort({...sort,sortBy: field})
  }
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/books/${id}`, {
        headers: {
          Authorizations: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBooks(books.filter((r) => r.id !== id));
        setShow(true);
        setInterval(() => setShow(false), 3000);
        setAction({ type: "danger", message: "Book Deleted Successfully" });
      });
  };

  useEffect(()=> {
    setSort(sortToggle ? {...sort,sortDir : 'asc'} : {...sort,sortDir : 'desc'} )
  },[sortToggle])


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
            <div style={{ float: "right" }}>
              <label>Records per Page:</label>

              <select
                style={pageNumCss}
                id="records_per_page"
                onChange={(e) => setPage({ ...page, pageSize: e.target.value })}
              >
                <option id="2" value="2">
                  2
                </option>
                <option id="4" value="4">
                  4
                </option>
                <option id="5" value="5">
                  5
                </option>
                <option id="10" value="10">
                  10
                </option>
              </select>
            </div>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th onClick={()=> handleToggle("id")}>Id <div className={sort.sortBy === "id"&& (sortToggle? "arrow arrow-up":"arrow arrow-down")}></div></th>
                  <th onClick={()=> handleToggle("title")}>Title <div className={sort.sortBy === 'title' && (sortToggle? "arrow arrow-up":"arrow arrow-down")}></div></th>
                  <th onClick={()=> handleToggle("isbnNumber")}>Isbn Numbers <div className={sort.sortBy === 'isbnNumber' && (sortToggle? "arrow arrow-up":"arrow arrow-down")}></div></th>
                  <th onClick={()=> handleToggle("author")}>Author <div className={sort.sortBy === 'author' && (sortToggle? "arrow arrow-up":"arrow arrow-down")}></div></th>
                  <th onClick={()=> handleToggle("price")}>Price<div className={sort.sortBy === 'price' &&(sortToggle? "arrow arrow-up":"arrow arrow-down")}></div></th>
                  <th onClick={()=> handleToggle("language")}>Language <div className={sort.sortBy === 'language' &&(sortToggle? "arrow arrow-up":"arrow arrow-down")}></div></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books?.length === 0 ? (
                  <tr align="center">
                    <td colSpan={6}>No Books Data Available</td>
                  </tr>
                ) : (
                  books?.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.isbnNumber}</td>
                      <td>{book.author}</td>
                      <td>{book.price}</td>
                      <td>{book.language}</td>
                      <td>
                        <Link
                          to={"/edit/" + book.id}
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
          <Card.Footer>
            <div style={{ float: "left" }}>
              {page.pageNumber}
              Showing Page {page.pageNumber + 1} of {page.totalPages}
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="md">
                <Button
                  type="button"
                  variant="outline-info"
                  onClick={() => setPage({ ...page, pageNumber: 0 })}
                >
                  {" "}
                  <FontAwesomeIcon icon={faFastBackward} /> First
                </Button>
                <Button
                  type="button"
                  variant="outline-info"
                  onClick={() =>
                    setPage({
                      ...page,
                      pageNumber:
                        page.pageNumber !== 0 ? page.pageNumber - 1 : 0,
                    })
                  }
                >
                  {" "}
                  <FontAwesomeIcon icon={faStepBackward} /> Prev
                </Button>

                <FormControl
                  className="bg-dark text-white"
                  size="sm"
                  style={pageNumCss}
                />

                <Button
                  type="button"
                  variant="outline-info"
                  onClick={() =>
                    setPage({
                      ...page,
                      pageNumber:
                        page.pageNumber !== page.totalPages - 1
                          ? page.pageNumber + 1
                          : page.totalPages - 1,
                    })
                  }
                >
                  {" "}
                  Next <FontAwesomeIcon icon={faStepForward} />
                </Button>
                <Button
                  type="button"
                  variant="outline-info"
                  onClick={() =>
                    setPage({ ...page, pageNumber: page.totalPages - 1 })
                  }
                >
                  {" "}
                  Last <FontAwesomeIcon icon={faFastForward} />
                </Button>
              </InputGroup>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}
