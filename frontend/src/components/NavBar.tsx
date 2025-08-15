import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { filterData } from "../counterSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  interface HandleSearchEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSearch = (e: HandleSearchEvent): void => {
    e.preventDefault();
    dispatch(filterData(searchTerm));
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">Tofler</Navbar.Brand>
        <Nav>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
