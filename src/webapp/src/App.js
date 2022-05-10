import logo from "./logo.svg";
import "./App.css";
import Jumbotron from "./component/Jumbotron";
import Navigations from "./component/Navigations";
import Footer from "./component/Footer";
import BookList from "./component/BookList";
import AddBook from "./component/AddBook";
import Login from "./component/Login";
import Register from "./component/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navigations />
        <Routes>
          <Route exact path="/" element={<Jumbotron />} />
          <Route exact path="/add-book" element={<AddBook />} />
          <Route  path="/edit/:id" element={<AddBook />} />
          <Route exact path="/books" element={<BookList/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/logout" element={<Login/>} />
        </Routes>
        
        <h1 className="text-white"> Hello</h1>
        

        <Footer />
      </Router>
    </>
  );
}

export default App;
