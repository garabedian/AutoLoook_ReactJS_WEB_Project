import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { formatDate } from '../utils/date-formatter.js';

const defaultTheme = createTheme();

const ItemDetails = () => {
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
        ownerId: user ? user.uid : null,
    });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [isUploadComplete, setIsUploadComplete] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchedItem = await Backendless.Data.of('cars').findById(id);
                setItem(fetchedItem);
                const fetchedComments = await Backendless.Data.of('comments').find({ condition: `itemId = '${id}'` });
                setComments(fetchedComments);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to update a vehicle.');
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to add a comment.');
            return;
        }

        const commentData = {
            itemId: id,
            authorId: user.objectId,
            authorEmail: user.email,
            content: newComment,
            created: new Date().toISOString(),
        };

        try {
            await Backendless.Data.of('comments').save(commentData);
            setComments([...comments, commentData]);
            setNewComment('');
        } catch (err) {
            setError(err.message);
        }
    };

    const isOwner = user && user.objectId === item.ownerId;
    const filteredComments = comments.filter(comment => comment.itemId === id);

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
                      {isOwner ? "Edit or Comment Your Vehicle" : "View or Comment Vehicle"}
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
                            disabled={!isOwner}
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
                        disabled={!isOwner}
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
                        disabled={!isOwner}
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
                        disabled={!isOwner}
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
                        rows={1}
                        disabled={!isOwner}
                      />
                      {item.photoURL && (
                        <img
                          src={item.photoURL}
                          alt={`${item.make} ${item.model}`}
                          style={{ width: '200px', height: 'auto', margin: '10px 0' }}
                        />
                      )}
                      {isOwner &&
                        <>
                            {/*<FileUpload*/}
                            {/*  fileType="new vehicle new photo"*/}
                            {/*  setPhotoURL={(url) => setItem({ ...item, photoURL: url })}*/}
                            {/*  onUploadComplete={() => setIsUploadComplete(true)}*/}
                            {/*/>*/}
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                            >
                                {isOwner ? "Update Vehicle" : "Add Comment"}
                            </Button>
                        </>
                      }
                  </Box>
                  <Box component="form" onSubmit={handleCommentSubmit} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="newComment"
                        label="Add a Comment"
                        name="newComment"
                        autoComplete="newComment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        multiline
                        rows={3}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                          Add Comment
                      </Button>
                  </Box>
                  {filteredComments.length > 0  &&
                  <Box sx={{ mt: 2, width: '100%' }}>
                      <Typography component="h2" variant="h5">
                          Comments
                      </Typography>
                      {filteredComments.map((comment) => (
                        <Box key={comment.objectId} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                            <Typography variant="body2" color="textSecondary">
                                {`Commented by ${comment.authorEmail} on ${formatDate(comment.created)}`}
                            </Typography>
                            <Typography variant="body1">
                                {comment.content}
                            </Typography>
                        </Box>
                      ))}
                  </Box>}
              </Box>
          </Container>
      </ThemeProvider>
    );
};

export default ItemDetails;