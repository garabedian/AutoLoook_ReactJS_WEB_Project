import { useContext, useEffect, useRef, useState } from 'react';
import './file-upload.module.css';
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";
import { UserContext } from '../contexts/user-context.jsx';
import CircularProgressWithLabel from './linear-progres-with-label.jsx';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7QqwEc1RGXMIeC95_z-TI69LNrIcBQE4",
    authDomain: "autoloook.firebaseapp.com",
    projectId: "autoloook",
    storageBucket: "autoloook.appspot.com",
    messagingSenderId: "518377849791",
    appId: "1:518377849791:web:6f3698cc91b8727c9e170a",
    measurementId: "G-CKWQ1SXCBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function FileUpload({ fileType, setPhotoURL, onUploadComplete, allowUnauthenticated = false }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [setFileExists] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const fileInputRef = useRef(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Cleanup preview URL
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewUrl(previewUrl);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        if (!file) return;
        if (!user && !allowUnauthenticated) {
            console.log('No authenticated user. Please log in.');
            return;
        }
        checkFileExists();
    };

    const checkFileExists = () => {
        const storage = getStorage();
        const storageRef = ref(storage, `files/${file.name}`);
        getMetadata(storageRef)
          .then(() => {
              setFileExists(true);
              setOpenDialog(true);
          })
          .catch(() => {
              uploadFile();
          });
    };

    const uploadFile = () => {
        setIsUploading(true); // Start uploading
        const storage = getStorage();
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
              const bytesProgress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
              setProgress(bytesProgress); // Update progress bar
              console.log('Upload is ' + bytesProgress + '% done');
          },
          (error) => {
              console.error('Upload failed', error);
              setIsUploading(false); // Stop uploading on error
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  setIsUploading(false);
                  setUploadSuccess(true);
                  setPhotoURL(downloadURL);
                  onUploadComplete();
              });
          }
        );
    };

    const handleDialogClose = (action) => {
        setOpenDialog(false);
        if (action === 'tryAgain') {
            setFile(null);
            setPreviewUrl('');
        }
    };

    return (
      <div className="animate__animated animate__bounceInUp">
          <Paper style={{ backgroundColor: "#d39494" }}><span><b>{`Upload a ${fileType} to Firebase`}</b></span></Paper>
          {!uploadSuccess &&
            <Paper style={{ backgroundColor: "#c46262" }}>
                <button onClick={handleButtonClick}
                        style={{
                            cursor: "pointer",
                            padding: "10px",
                            backgroundColor: "lightblue",
                            color: "purple",
                            margin: "5px",
                            borderRadius: "10px",
                        }}>Choose a file
                </button>
                <input style={{ display: "none" }} type="file" onChange={handleChange} ref={fileInputRef}
                       className="file-input"/>
            </Paper>
          }
          <Paper style={{ backgroundColor: "#ad4545" }}>
              {uploadSuccess ? (
                <span><strong>Upload successful!</strong></span>
              ) : (
                <>
                    {file && <span><strong>Selected file:</strong> {file.name}</span>}
                    <div className="preview-container">
                        {previewUrl && <img src={previewUrl} alt="No Preview Available"
                                            style={{
                                                width: "20%",
                                                height: "20%",
                                                margin: "5px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                            }}/>}
                    </div>
                    <Button onClick={handleUpload}
                            sx={{
                                color: "#d9bf97",
                                backgroundColor: "#4d8cb6",
                                transition: 'backgroundColor 0.3s',
                                cursor: "pointer",
                                padding: "10px",
                                margin: "5px",
                                border: "none",
                                borderRadius: "10px",
                                '&:hover': {
                                    backgroundColor: '#0c68a2',
                                },
                            }}>Upload to Cloud</Button>
                </>
              )}
          </Paper>
          {isUploading &&
            <Paper style={{
                backgroundColor: "#ad4545",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <CircularProgressWithLabel value={progress}/>
            </Paper>
          }
          <Dialog open={openDialog} onClose={() => handleDialogClose('continue')}>
              <DialogTitle>File Already Exists</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      The file you are trying to upload already exists. Would you like to try uploading a different file
                      or continue without uploading?
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => handleDialogClose('tryAgain')} color="primary">
                      Try Again
                  </Button>
                  <Button onClick={() => handleDialogClose('continue')} color="primary" autoFocus>
                      Continue
                  </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
}

export default FileUpload;