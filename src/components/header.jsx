import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import projectLogo from "/images/car.png";
import { UserContext } from '../contexts/user-context.jsx';
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
          <Navbar.Brand href="/">
              <Image src={projectLogo} style={{ height: '40px', width: '40px' }} alt="Car logo"/>
              <span style={{ color: 'wheat', marginLeft: '10px' }}>Auto Loook</span>
          </Navbar.Brand>
          <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project">Home</Nav.Link>
                  <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project/list-items">All vehicles</Nav.Link>
                  <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project/create-item">Add vehicle</Nav.Link>
                  <Nav className="nav-center">
                      <Nav.Link as={Link} to="/AutoLoook_ReactJS_WEB_Project/file-upload">File upload</Nav.Link>
                  </Nav>
              </Nav>
              <Nav className="nav-right nav-center-vertical">
                  {user ? (
                    <>
                        <Nav.Link as={Link} to={`/AutoLoook_ReactJS_WEB_Project/user-profile/${user.uid}`}>
                            <Image
                              src={ "https://firebasestorage.googleapis.com/v0/b/autoloook.appspot.com/o/files%2FTakvor_XxX.png?alt=media&token=ec577271-080c-4de3-ac6b-2f24d347c936"
                                || userAvatar }
                              roundedCircle
                              style={{ width: '40px', height: '40px', verticalAlign: 'middle', backgroundColor: 'grey'}}
                              alt="Avatar"
                            />
                        </Nav.Link>
                        <Nav.Link as={Link}>Hello, {user.name || user.email}!</Nav.Link>
                        <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
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