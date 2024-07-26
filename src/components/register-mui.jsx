import React, { useContext, useEffect, useRef, useState } from 'react';
import Backendless from '../backendless';
import { Link, useNavigate } from 'react-router-dom';
import FileUpload from './file-upload.jsx';
import { UserContext } from '../contexts/user-context.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
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
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline/>
              <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'rgba(245, 245, 245, 0.7)',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
              >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon/>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Sign up
                  </Typography>
                  <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <FileUpload setPhotoURL={setPhotoURL} onUploadComplete={() => setIsUploadComplete(true)} />
                      {error && <Typography color="error">{error}</Typography>}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                          Sign Up
                      </Button>
                      <Grid container justifyContent="flex-end">
                          <Grid item>
                              <Link to="/AutoLoook_ReactJS_WEB_Project/login" variant="body2">
                                  Already have an account? Sign in
                              </Link>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>
          </Container>
      </ThemeProvider>
    );
};

export default Register;