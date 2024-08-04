import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Tooltip } from '@mui/material';
import FileUpload from './FileUpload.jsx';
import useCreateItem from '../hooks/useCreateItem.jsx';

const defaultTheme = createTheme();

const CreateItem = () => {
    const {
        item,
        error,
        isUploadComplete,
        setItem,
        handleSubmit,
        handleChange,
    } = useCreateItem();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
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
                                sx={{ textAlign: 'left' }}
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
                            onUploadComplete={() => setIsUploadComplete(true)}
                        />
                        <Tooltip title={!isUploadComplete ? "First upload a picture file" : ""}>
                            <span>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!isUploadComplete}
                                >
                                    Add Vehicle
                                </Button>
                            </span>
                        </Tooltip>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default CreateItem;