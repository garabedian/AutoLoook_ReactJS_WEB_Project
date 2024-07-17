import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import projectLogo from "/images/seat.png";

export default function MainContent({ isAuthenticated }) {
    return (
      <>
          <div>
              <a href="/#" target="_blank">
                  <img src={projectLogo} className="logo picture-background animate__animated animate__bounceInDown" alt="Car logo"/>
              </a>
          </div>
          <br/>
          <br/>
          <h1 className="emboss display-3
           text-center animate__animated animate__bounceInRight"><strong>Welcome
              to</strong></h1>
          <h1 className="emboss text-center animate__animated animate__bounceInLeft">Auto Loook</h1>
          <p className="lead text-center animate__animated animate__bounceInRight" style={{color: "pink"}}><em><strong>Share the cars
              and vehicles you own or like.</strong></em></p>
          {!isAuthenticated() && (
            <>
                <hr className="my-4"/>
                <div className="inner cover animate__animated animate__zoomInUp">
                    <Row>
                        <Col lg={6}>
                            <p className="lead" style={{color: "pink"}}>Registered user? <br/><Link
                              to="/AutoLoook_ReactJS_WEB_Project/login" className="btn btn-lg btn-secondary">sign
                                in</Link></p>
                        </Col>
                        <Col lg={6}>
                            <p className="lead" style={{color: "pink"}}>Welcome, guest!<br/><Link
                              to="/AutoLoook_ReactJS_WEB_Project/register" className="btn btn-lg btn-secondary">sign
                                up</Link></p>
                        </Col>
                    </Row>
                </div>
            </>
          )}
          <hr className="my-4"/>
          <div className="inner cover animate__animated animate__zoomIn">
              <Row>
                  <Col lg={6}>
                      <p className="lead" style={{color: "pink"}}>Free public zone&ensp;<br/><Link
                        to="/AutoLoook_ReactJS_WEB_Project/list-items" className="btn btn-lg btn-secondary">List
                          all vehicles</Link></p>
                  </Col>
                  <Col lg={6}>
                      <p className="lead" style={{color: "pink"}}>Logged in users can<br/><Link
                        to="/AutoLoook_ReactJS_WEB_Project/create-item" className="btn btn-lg btn-secondary">Create
                          a vehicle</Link></p>
                  </Col>
              </Row>
          </div>
      </>
    );
};
