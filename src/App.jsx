import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; // Import useNavigate
import { UserContext } from './contexts/UserContext.jsx';
import './App.css';
import MainContent from "./components/MainContent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './components/Custom.css';
import FileUpload from "./components/FileUpload.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Login from './components/Login.jsx';
import ReLogin from './components/ReLogin.jsx';
import Register from './components/Register.jsx';
import CreateItem from './components/CreateItem.jsx';
import ListItems from "./components/ListItems.jsx";
import NotYetImplemented from './components/NotYetImplemented.jsx';
import CarDetails from "./components/ItemDetails.jsx";
import { ProtectedRouteLoggedUser, ProtectedRouteNoUser } from './components/ProtectedRoute.jsx';

function App() {
    const [showImage, setShowImage] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const currentUser = await Backendless.UserService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (err) {
                console.error('Failed to retrieve user session', err);
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, [setUser]);

    if (loading) {
        return;
    }

    return (
      <>
          <Header/>
          {showImage && <Routes>
              <Route path="/AutoLoook_ReactJS_WEB_Project/*" element={<NotYetImplemented/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project" element={<MainContent/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/list-items" element={<ListItems/>}/>
              {/*<Route path="/AutoLoook_ReactJS_WEB_Project/register" element={<Register/>}/>*/}
              {/*<Route path="/AutoLoook_ReactJS_WEB_Project/login" element={<Login/>}/>*/}
              {/*<Route path="/AutoLoook_ReactJS_WEB_Project/re-login" element={<ReLogin/>}/>*/}

              <Route path="/AutoLoook_ReactJS_WEB_Project/register"
                     element={<ProtectedRouteLoggedUser element={Register}/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/login" element={<ProtectedRouteLoggedUser element={Login}/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/re-login"
                     element={<ProtectedRouteLoggedUser element={ReLogin}/>}/>

              <Route path="/AutoLoook_ReactJS_WEB_Project/file-upload"
                     element={<ProtectedRouteNoUser element={FileUpload}/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/car/:id"
                     element={<ProtectedRouteNoUser element={CarDetails}/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/create-item"
                     element={<ProtectedRouteNoUser element={CreateItem}/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/create-item"
                     element={user ? <CreateItem/> : <Navigate to="/AutoLoook_ReactJS_WEB_Project/login"/>}/>
              <Route path="/AutoLoook_ReactJS_WEB_Project/not-yet-implemented" element={<NotYetImplemented/>}/>
          </Routes>}
          <Footer showImage={showImage} setShowImage={setShowImage}/>
      </>
    );
}

export default App;