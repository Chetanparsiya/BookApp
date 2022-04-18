import logo from "./logo.svg";
import "./App.css";
import Jumbotron from "./component/Jumbotron";
import Navigations from "./component/Navigations";
import Footer from "./component/Footer";
import BookList from "./component/BookList";
import AddBook from "./component/AddBook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navigations />
        <Routes>
          <Route exact path="/" element={<Jumbotron />} />
          <Route exact path="/add-book" element={<AddBook />} />
          <Route exact path="/books" element={<BookList/>} />
        </Routes>
        
        <h1 className="text-white"> Hello</h1>
        

        <Footer />
      </Router>
    </>
  );
}

export default App;
