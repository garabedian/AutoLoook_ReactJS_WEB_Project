import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';
import projectLogo from "/images/car.png";
import { UserContext } from '../contexts/UserContext.jsx';
import userAvatar from '/images/user.png';

const Header = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/AutoLoook_ReactJS_WEB_Project');
    };

    return (
      <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top" style={{ marginBottom: '2%' }}>
          <Navbar.Toggle aria-controls="navbarNavDropdown"/>
          <Navbar.Brand as={Link} to="/AutoLoook_ReactJS_WEB_Project">
              <Image src={projectLogo} style={{ height: '40px', width: '40px' }} alt="Car logo"/>
              <span style={{ color: 'wheat', marginLeft: '10px' }}>Auto Loook</span>
          </Navbar.Brand>
          <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project">Home</Nav.Link>
                  <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project/list-items">All vehicles</Nav.Link>
                  {user && (
                    <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project/create-item">Add vehicle</Nav.Link>
                  )}
              </Nav>
              <Nav className="nav-right nav-center-vertical">
                  {user ? (
                    <>
                        <Nav.Link as={Link} to={`/AutoLoook_ReactJS_WEB_Project/user-profile/${user.uid}`}>
                            <Image
                              src={user.photoURL || userAvatar}
                              roundedCircle
                              style={{
                                  width: '40px',
                                  height: '40px',
                                  verticalAlign: 'middle',
                                  backgroundColor: 'grey'
                              }}
                              alt="Avatar"
                            />
                        </Nav.Link>
                        <Nav.Link as={Link}>Hello, {(user.name && user.name.length > 1) ? user.name : user.email}!</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                        <Nav.Link>Hello Visitor! You are welcome!</Nav.Link>
                        <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project/register">Register</Nav.Link>
                    </>
                  )}
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
};

export default Header;