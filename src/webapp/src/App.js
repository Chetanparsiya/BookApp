import logo from "./logo.svg";
import "./App.css";
import Jumbotron from "./component/Jumbotron";
import Navigations from "./component/Navigations";
import Footer from "./component/Footer";
import BookList from "./component/BookList";
import AddBook from "./component/AddBook";
import Login from "./component/Login";
import Register from "./component/Register";
import NotFound from "./component/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProvideAuth } from "./component/AuthProvider";
import { PrivateWrapper,PublicWrapper } from "./component/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <ProvideAuth>
          <Navigations />
          <Routes>
            <Route exact path="/" element={<Jumbotron />} />
            <Route element={<PrivateWrapper />}>
              <Route exact path="/books" element={<BookList />} />
              <Route exact path="/add-book" element={<AddBook />} />
              <Route path="/edit/:id" element={<AddBook />} />
            </Route>
            <Route exact path="/404" element={<NotFound />} />
            <Route element={<PublicWrapper />}>
              {" "}
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Route>
          </Routes>

          <Footer />
        </ProvideAuth>
      </Router>
    </>
  );
}

export default App;
