import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './FileUpload.module.css';
import { Button, Paper } from "@mui/material";
import { UserContext } from '../contexts/UserContext.jsx';
import CircularProgressWithLabel from './LinearProgressWithLabel.jsx';

const CLOUDINARY_CLOUD_NAME = 'dg7r90p8n';
const CLOUDINARY_UPLOAD_PRESET = 'n9lraw07';

function FileUpload({ fileType, folder = 'autoloook', setPhotoURL, onUploadComplete, allowUnauthenticated = false }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreviewUrl(URL.createObjectURL(selected));
            setUploadError('');
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = () => {
        if (!file) return;
        if (!user && !allowUnauthenticated) {
            console.log('No authenticated user. Please log in.');
            return;
        }
        uploadFile();
    };

    const uploadFile = () => {
        setIsUploading(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', folder);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                setProgress((e.loaded / e.total) * 100);
            }
        };

        xhr.onload = () => {
            setIsUploading(false);
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                setUploadSuccess(true);
                setPhotoURL(response.secure_url);
                onUploadComplete();
            } else {
                setUploadError('Upload failed. Please try again.');
                console.error('Upload failed', xhr.responseText);
            }
        };

        xhr.onerror = () => {
            setIsUploading(false);
            setUploadError('Upload error. Please check your connection.');
        };

        xhr.send(formData);
    };

    return (
        <div className="animate__animated animate__bounceInUp">
            <Paper style={{ backgroundColor: "#d39494" }}>
                <span><b>{`Upload a ${fileType} to Cloud`}</b></span>
            </Paper>
            {!uploadSuccess &&
                <Paper style={{ backgroundColor: "#c46262" }}>
                    <button
                        onClick={handleButtonClick}
                        style={{
                            cursor: "pointer",
                            padding: "10px",
                            backgroundColor: "lightblue",
                            color: "purple",
                            margin: "5px",
                            borderRadius: "10px",
                        }}>
                        Choose a file
                    </button>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        ref={fileInputRef}
                        className="file-input"
                    />
                </Paper>
            }
            <Paper style={{ backgroundColor: "#ad4545" }}>
                {uploadSuccess ? (
                    <span><strong>Upload successful!</strong></span>
                ) : (
                    <>
                        {file && <span><strong>Selected file:</strong> {file.name}</span>}
                        <div className="preview-container">
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="No Preview Available"
                                    style={{
                                        width: "20%",
                                        height: "20%",
                                        margin: "5px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            )}
                        </div>
                        {uploadError && (
                            <div style={{ color: 'red' }}>
                                <strong>{uploadError}</strong>
                            </div>
                        )}
                        <Button
                            onClick={handleUpload}
                            disabled={!file || isUploading}
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
                            }}>
                            Upload to Cloud
                        </Button>
                    </>
                )}
            </Paper>
            {isUploading && (
                <Paper style={{
                    backgroundColor: "#ad4545",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <CircularProgressWithLabel value={progress}/>
                </Paper>
            )}
        </div>
    );
}

FileUpload.propTypes = {
    fileType: PropTypes.string.isRequired,
    folder: PropTypes.string,
    setPhotoURL: PropTypes.func.isRequired,
    onUploadComplete: PropTypes.func.isRequired,
    allowUnauthenticated: PropTypes.bool,
};

export default FileUpload;
