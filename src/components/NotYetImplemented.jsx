import React from 'react';
import notYetImplementedImage from '/images/404face.png';
import './Custom.css';

const NotYetImplemented = () => {
    return (
      <div className="not-yet-implemented-container">
          <img src={notYetImplementedImage} alt="Not Yet Implemented"
               className="not-yet-implemented-image animate__animated animate__bounceInDown"/>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="not-yet-implemented-title emboss display-3
           text-center animate__animated animate__bounceInUp">Not Yet Implemented</h1>
      </div>
    );
};

export default NotYetImplemented;