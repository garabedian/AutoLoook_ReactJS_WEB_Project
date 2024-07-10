import { useState } from 'react';
import './fileupload.module.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAuth,  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Button, Paper } from "@mui/material";

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
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
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
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
              });
          }
        );
    };

    return (
      <div>
          <Paper style={{ backgroundColor: "#d39494" }}>File Upload to Firebase Storage</Paper>
          <Paper style={{ backgroundColor: "#c46262" }}>Choose a file to upload</Paper>
          <Paper style={{ backgroundColor: "#ad4545" }}>
              <input type="file" onChange={handleChange}/>
              <Button onClick={handleUpload}
                      sx={{
                          color: "#d9bf97",
                          backgroundColor: "#4d8cb6",
                          transition: 'backgroundColor 0.3s',
                          '&:hover': {
                              backgroundColor: '#0c68a2',
                          },
                      }}>Upload to Cloud</Button>
          </Paper>
      </div>
    );
}

export default FileUpload;