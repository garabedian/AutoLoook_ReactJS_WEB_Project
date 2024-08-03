import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import photoSeat from "/images/seat.png";
import { UserContext } from '../contexts/user-context.jsx';
import React, { useContext } from "react";

export default function MainContent() {
    const { user } = useContext(UserContext);

    return (
      <>
          <br/>
          <div>
              <button style={{ backgroundColor: "transparent", border: "none" }}
                      onClick={() => window.location.reload()}>
                  <img src={photoSeat} className="logo picture-background animate__animated animate__bounceInDown"
                       alt="Car logo"/>
              </button>
          </div>
          <br/>
          <br/>
          <h1 className="emboss display-3
           text-center animate__animated animate__bounceInRight"><strong>Welcome
              to</strong></h1>
          <h1 className="emboss text-center animate__animated animate__bounceInLeft">Auto Loook</h1>
          <p className="lead text-center animate__animated animate__bounceInRight" style={{ color: "pink" }}>
              <em><strong>Share the cars
                  and vehicles you own or like.</strong></em></p>
          <div className="logo picture-background center-picture-background">
              {!user && (
                <>
                    <div className="inner cover animate__animated animate__zoomInUp">
                        <Row>
                            <Col lg={6}>
                                <p className="lead" style={{ color: "pink" }}>Welcome, guest!<br/><Link
                                  to="/AutoLoook_ReactJS_WEB_Project/register" className="btn btn-lg btn-secondary">sign
                                    up</Link></p>
                            </Col>
                            <Col lg={6}>
                                <p className="lead" style={{ color: "pink" }}>Registered user? <br/><Link
                                  to="/AutoLoook_ReactJS_WEB_Project/login" className="btn btn-lg btn-secondary">sign
                                    in</Link></p>
                            </Col>
                        </Row>
                    </div>
                    <hr className="my-2"/>
                    <div className="inner cover animate__animated animate__zoomIn center-picture-background">
                        <Row>
                            <Col lg={6}>
                                <p className="lead" style={{ color: "pink" }}>Free public zone&ensp;<br/><Link
                                  to="/AutoLoook_ReactJS_WEB_Project/list-items" className="btn btn-lg btn-secondary">List
                                    all vehicles</Link></p>
                            </Col>
                            <Col lg={6}>
                                <p className="lead" style={{ color: "pink" }}>Logged in users can<br/><Link
                                  to="/AutoLoook_ReactJS_WEB_Project/create-item" className="btn btn-lg btn-secondary">Create
                                    a vehicle</Link></p>
                            </Col>
                        </Row>
                    </div>
                </>
              )}
              {user && (
                <div className="inner cover animate__animated animate__zoomIn center-picture-background">
                    <Row>
                        <Col lg={6}>
                            <p className="lead" style={{ color: "pink" }}>Free public zone&ensp;<br/><Link
                              to="/AutoLoook_ReactJS_WEB_Project/list-items" className="btn btn-lg btn-secondary">List
                                all vehicles</Link></p>
                        </Col>
                        <Col lg={6}>
                            <p className="lead" style={{ color: "pink" }}>Logged in users can<br/><Link
                              to="/AutoLoook_ReactJS_WEB_Project/create-item" className="btn btn-lg btn-secondary">Create
                                a vehicle</Link></p>
                        </Col>
                    </Row>
                </div>
              )}
          </div>
          <br/>
      </>
    );
};
