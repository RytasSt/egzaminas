import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { TbBrandOpenai } from "react-icons/tb";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";

function Navigation() {
  const { getLoggedIn, isAdmin } = useContext(AuthContext);

  const logOut = async () => {
    await axios.get("http://localhost:3000/users/logout");
    getLoggedIn();
  };

  const renderAdminLinks = () => {
    if (isAdmin) {
      return (
        <>
          <Link to="/addmenu/" className="nav-link">
            Add Category
          </Link>
          <Link to="/addmeals/" className="nav-link">
            Add Service
          </Link>
          <Link to="/orders/" className="nav-link">
            Orders
          </Link>
        </>
      );
    }
    return null;
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="shadow">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <TbBrandOpenai size={50} />
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="p-2" to="/">Home</Link>
            <Link className="p-2" to="/menu">Categories</Link>
            <Link className="p-2" to="/cart">Cart</Link>
            <Link className="p-2" to="/orders">Orders</Link>
            {/* <Link className="p-2" to="/create">Create Employee</Link>{" "} */}
            {renderAdminLinks()}
          </Nav>
          <Button onClick={logOut}>
            Logout
          </Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
