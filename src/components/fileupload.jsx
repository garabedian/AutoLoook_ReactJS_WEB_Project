import { useEffect, useRef, useState } from 'react';
import './fileupload.module.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Paper } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

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
const auth = getAuth(app);

// // Sign up new users
// auth.createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     console.log(user);
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.error(errorCode, errorMessage);
//   });
//
// // Sign in existing users
// auth.signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     console.log(user);
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.error(errorCode, errorMessage);
//   });

function FileUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const fileInputRef = useRef(null);

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

    // // This function will upload the file to Firebase Storage w/o checking for authentication
    // const handleUpload = () => {
    //     if (!file) return;
    //     uploadFile(); // Directly call uploadFile without checking for authentication
    // };
    //
    // const uploadFile = () => {
    //     const storage = getStorage();
    //     const storageRef = ref(storage, `files/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    //
    //     uploadTask.on('state_changed',
    //       (snapshot) => {
    //           const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
    //           console.log('Upload is ' + progress + '% done');
    //       },
    //       (error) => {
    //           console.error('Upload failed', error);
    //       },
    //       () => {
    //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //               console.log('File available at', downloadURL);
    //           });
    //       }
    //     );
    // };

    // This function will check for authentication before uploading the file to Firebase Storage
    const handleUpload = () => {
        if (!file) return;
        if (!auth.currentUser) {
            console.log('No authenticated user. Please log in.');
            // Here, you could call a login function or show a login form
            // For simplicity, this example will use signInWithEmailAndPassword
            signInWithEmailAndPassword(auth, 'takvor@abv.bg', 'takvor')
              .then((userCredential) => {
                  console.log('Authentication successful', userCredential);
                  // Proceed with the upload after successful login
                  uploadFile();
              })
              .catch((error) => {
                  console.error('Authentication failed', error);
              });
        } else {
            uploadFile();
        }
    };

    const uploadFile = () => {
        setIsUploading(true); // Start uploading
        const storage = getStorage();
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
              const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
              console.log('Upload is ' + progress + '% done');
          },
          (error) => {
              console.error('Upload failed', error);
              setIsUploading(false); // Stop uploading on error
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  setIsUploading(false); // Stop uploading on success
                  setUploadSuccess(true); // Indicate upload success
              });
          }
        );
    };

    return (
      <div className="animate__animated animate__bounceInUp">
          <Paper style={{ backgroundColor: "#d39494" }}><span><b>File Upload to Firebase Storage</b></span></Paper>
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
                <CircularProgress
                  style={{ padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}/>
            </Paper>
          }
      </div>
    );
}

export default FileUpload;