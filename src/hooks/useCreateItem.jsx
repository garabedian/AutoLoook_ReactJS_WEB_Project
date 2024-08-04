import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';
import Backendless from '../backendless.js';

export default function useCreateItem() {
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
