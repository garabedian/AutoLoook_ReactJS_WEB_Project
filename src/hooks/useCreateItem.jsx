import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';
import Backendless from '../backendless.js';

const DEFAULT_PHOTO_URL = 'https://firebasestorage.googleapis.com/v0/b/autoloook.appspot.com/o/files%2Fgeneric.jpg?alt=media&token=c5811e24-3ff5-499c-a1dd-8629f782a0b9';

export default function useCreateItem() {
    const { user } = useContext(UserContext);
    const [item, setItem] = useState({
        make: '',
        model: '',
        productionYear: 0,
        likes: 0,
        comments: '',
        photoURL: DEFAULT_PHOTO_URL,
        description: '',
        type: 'UNKNOWN',
        ownerId: user ? user.uid : null,
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

        if (!isUploadComplete && item.photoURL === DEFAULT_PHOTO_URL) {
            setError('Please upload a picture or use the default image.');
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
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    return {
        item,
        error,
        isUploadComplete,
        setItem,
        setError,
        setIsUploadComplete,
        handleSubmit,
        handleChange,
    };
};