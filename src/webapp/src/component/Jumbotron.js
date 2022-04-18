import React from "react";

export default function Jumbotron() {
  return (
    <div>
      <div className="container bg-dark p-5 mt-5 ">
        <h1 className="display-4 fw-bold text-white text-center">
          Welcome to Book App
        </h1>
        <blockquote className="blockquote text-center">
          <p className="text-white">Here’s to books, the cheapest vacation you can buy.</p>
          <footer className="blockquote-footer">Charlaine Haris</footer>
        </blockquote>
      </div>
    </div>
  );
}
