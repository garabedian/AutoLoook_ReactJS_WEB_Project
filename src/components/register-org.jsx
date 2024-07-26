import React, { useContext, useEffect, useState, useRef } from 'react';
import Backendless from '../backendless';
import { useNavigate } from 'react-router-dom';
import FileUpload from './file-upload.jsx';
import { UserContext } from '../contexts/user-context.jsx';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const logoutUser = async () => {
            try {
                await Backendless.UserService.logout();
                setUser(null);
            } catch (err) {
                console.error('Logout failed', err);
            }
        };

        logoutUser();
    }, [setUser]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!isUploadComplete) {
            setError('Please wait for the file upload to complete.');
            return;
        }

        const user = new Backendless.User();
        user.email = email;
        user.password = password;
        user.name = name;
        user.photoURL = photoURL;

        try {
            await Backendless.UserService.register(user);
            await Backendless.UserService.login(email, password, true);
            const currentUser = await Backendless.UserService.getCurrentUser();
            setUser(currentUser);
            navigate('/AutoLoook_ReactJS_WEB_Project');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
      <div className="signup-container">
          <h2 className="emboss display-3 text-center animate__animated animate__bounceInRight">Sign Up</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FileUpload setPhotoURL={setPhotoURL} onUploadComplete={() => setIsUploadComplete(true)}
                          allowUnauthenticated={true}/>
              <button type="submit">Sign Up</button>
          </form>
      </div>
    );
};

export default Register;