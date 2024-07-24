import React, { useContext, useEffect, useState, useRef } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from './contexts/user-context.jsx';
import './App.css';
import MainContent from "./components/main-content.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './components/custom.css';
import FileUpload from "./components/file-upload.jsx";
import Footer from "./components/footer.jsx";
import Header from "./components/header.jsx";
import Login from './components/login.jsx';
import Relogin from './components/re-login.jsx';
import Register from './components/register.jsx';
import AddVehicle from './components/add-vehicle.jsx';
import NotYetImplemented from './components/not-yet-implemented.jsx';

function App() {
    const [showImage, setShowImage] = useState(true);
    const { user, setUser, logout } = useContext(UserContext); // Access logout from UserContext
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate(); // Define navigate
    const isFirstRender = useRef(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const currentUser = await Backendless.UserService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (err) {
                console.error('Failed to retrieve user session', err);
            }
        };

        checkUserSession();
    }, [setUser]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout(); // Call the logout function
        setIsLoggingOut(false);
        navigate('/AutoLoook_ReactJS_WEB_Project'); // Use navigate to redirect
    };

    return (
      <>
          <Header handleLogout={handleLogout}/>
          {showImage && <Routes>
              <Route path="/AutoLoook_ReactJS_WEB_Project/*" element={<NotYetImplemented />}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project" element={<MainContent/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/login" element={<Login/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/register" element={<Register/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/file-upload" element={<FileUpload/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/re-login" element={<Relogin/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/create-item"
                     element={user ? <AddVehicle/> : <Navigate to="/AutoLoook_ReactJS_WEB_Project/login"/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/not-yet-implemented" element={<NotYetImplemented />} />
          </Routes>}
          <Footer showImage={showImage} setShowImage={setShowImage}/>
      </>
    );
}

export default App;