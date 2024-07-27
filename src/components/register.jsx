import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import FileUpload from './file-upload.jsx';
import { UserContext } from '../contexts/user-context.jsx';
import Backendless from '../backendless';

const defaultTheme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const [error, setError] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
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
        user.name = `${firstName} ${lastName}`;
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
                  <Typography component="h1" variant="h4">
                      Sign up
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                              <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
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
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
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
                          </Grid>
                          <Grid item xs={12}>
                              <FileUpload setPhotoURL={setPhotoURL} fileType="profile photo" onUploadComplete={() => setIsUploadComplete(true)}/>
                          </Grid>
                      </Grid>
                      {error && <Typography color="error">{error}</Typography>}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                          Sign Up
                      </Button>
                      <Grid container >
                          <Grid item xs>
                              <Link to={'/AutoLoook_ReactJS_WEB_Project/login'} variant="body2">
                                  {"Already have an account? Sign in"}
                              </Link>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>
          </Container>
      </ThemeProvider>
    );
}