import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainContent from "./components/main-content.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './components/custom.css';
import FileUpload from "./components/file-upload.jsx";
import Footer from "./components/footer.jsx";
import Header from "./components/header.jsx";
import Login from './components/login.jsx';
import Register from './components/register.jsx';

const isAuthenticated = () => {
    // Implement your authentication logic here
    return false;
};

function App() {
    const [showImage, setShowImage] = useState(true);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      {showImage && <Routes>
        <Route path="/AutoLoook_ReactJS_WEB_Project/login" element={<Login />} />
        <Route path="/AutoLoook_ReactJS_WEB_Project/register" element={<Register />} />
        <Route path="/AutoLoook_ReactJS_WEB_Project/file-upload" element={<FileUpload />} />
        <Route path="/AutoLoook_ReactJS_WEB_Project" element={<MainContent isAuthenticated={isAuthenticated} />} />
      </Routes>}
      <Footer showImage={showImage} setShowImage={setShowImage} />
    </>
  );
}

export default App;