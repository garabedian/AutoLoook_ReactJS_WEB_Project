import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import projectLogo from "/images/car.png";

const Header = ({ isAuthenticated, user }) => {
    return (
      <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top" style={{ marginBottom: '2%' }}>
          <Navbar.Toggle aria-controls="navbarNavDropdown"/>
          <Navbar.Brand href="/">
              <Image src={projectLogo} style={{ height: '40px', width: '40px' }}
                     alt="Car logo"/>
              <span style={{ color: 'wheat', marginLeft: '10px' }}>Auto Loook</span>
          </Navbar.Brand>
          <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project">Home</Nav.Link>
                  <Nav.Link as={Link} to="/list-items">All vehicles</Nav.Link>
                  <Nav.Link as={Link} to="/create-item">Add vehicle</Nav.Link>
              </Nav>
              <Nav className="nav-right">
                  {isAuthenticated ? (
                    <>
                        <Nav.Link as={Link} to={`/user-profile/${user.id}`}>
                            <Image
                              src={user.userprofile.profile_image.url}
                              roundedCircle
                              style={{ width: '40px', height: '40px', verticalAlign: 'middle' }}
                              alt="Avatar"
                            />
                        </Nav.Link>
                        <Nav.Link>Hello, {user.username}!</Nav.Link>
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                        <Nav.Link>Hello Visitor! You are welcome!</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </>
                  )}
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
};

export default Header;
