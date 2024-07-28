import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user-context.jsx';
import Backendless from '../backendless';
import FileUpload from './file-upload.jsx';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const defaultTheme = createTheme();

const AddItem = () => {
    const { user } = useContext(UserContext);
    const [item, setItem] = useState({
        make: '',
        model: '',
        productionYear: 0,
        likes: 0,
        comments: '',
        photoURL: '',
        description: '',
        type: 'UNKNOWN',
        ownerId: user ? user.uid : null, // Setting ownerId here
    });
    const [error, setError] = useState('');
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to add a vehicle.');
            return;
        }

        if (!isUploadComplete) {
            setError('Please wait for the file upload to complete.');
            return;
        }

        try {
            await Backendless.Data.of('cars').save(item);
            navigate('/AutoLoook_ReactJS_WEB_Project/list-items');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ( { ...prevItem, [name]: value } ));
    };

    return (
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="lg">
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
                  <Typography component="h1" variant="h3">
                      Add Vehicle
                  </Typography>
                  {error && <Typography color="error">{error}</Typography>}
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                      <FormControl fullWidth margin="normal" required>
                          <InputLabel id="type-label">Type</InputLabel>
                          <Select
                            labelId="type-label"
                            id="type"
                            label="Type"
                            name="type"
                            value={item.type}
                            onChange={handleChange}
                            autoFocus
                            sx={{
                                textAlign: 'left',
                            }}
                          >
                              <MenuItem value="SEDAN">SEDAN</MenuItem>
                              <MenuItem value="HATCHBACK">HATCHBACK</MenuItem>
                              <MenuItem value="ESTATE">ESTATE</MenuItem>
                              <MenuItem value="MPV">MPV</MenuItem>
                              <MenuItem value="SUV">SUV</MenuItem>
                              <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                          </Select>
                      </FormControl>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="make"
                        label="Make"
                        name="make"
                        autoComplete="make"
                        value={item.make}
                        onChange={handleChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="model"
                        label="Model"
                        name="model"
                        autoComplete="model"
                        value={item.model}
                        onChange={handleChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="productionYear"
                        label="Build Year"
                        name="productionYear"
                        type="number"
                        autoComplete="productionYear"
                        value={item.productionYear}
                        onChange={handleChange}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        value={item.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                      />
                      <FileUpload
                        fileType="vehicle photo"
                        setPhotoURL={(url) => setItem({ ...item, photoURL: url })}
                        onUploadComplete={() => setIsUploadComplete(true)}/>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                          Add Vehicle
                      </Button>
                  </Box>
              </Box>
          </Container>
      </ThemeProvider>
    )
      ;
};

export default AddItem;