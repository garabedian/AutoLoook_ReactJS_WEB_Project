import React, { useState } from 'react';
import './App.css';
import MainContent from "./components/maincontent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './components/custom.css';
import FileUpload from "./components/fileupload.jsx";
import Footer from "./components/footer.jsx";
import Header from "./components/header.jsx";

const isAuthenticated = () => {
    // Implement your authentication logic here
    return false;
};

function App() {
    const [showImage, setShowImage] = useState(true);

    return (
      <>
          <Header/>
          {showImage && <MainContent isAuthenticated={isAuthenticated} />}
          {/*{showImage && <FileUpload/>}*/}
          <Footer showImage={showImage} setShowImage={setShowImage} />
      </>
    );
}

export default App;