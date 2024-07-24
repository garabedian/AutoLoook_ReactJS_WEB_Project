import React, { useState, useContext } from 'react';
import Backendless from '../backendless';
import { UserContext } from '../contexts/user-context.jsx';
import { useNavigate } from 'react-router-dom';
import FileUpload from './file-upload.jsx'; // Import the FileUpload component

const AddItem = () => {
  const { user } = useContext(UserContext);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [productionYear, setProductionYear] = useState('');
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState('');
  const [photoURL, setPhotoURL] = useState(''); // Add state for photoURL
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to add a vehicle.');
      return;
    }

    const vehicle = {
      make,
      model,
      production_year: parseInt(productionYear, 10),
      likes: parseInt(likes, 10),
      comments,
      photoURL, // Include photoURL in the vehicle object
    };

    try {
      await Backendless.Data.of('cars').save(vehicle);
      navigate('/AutoLoook_ReactJS_WEB_Project/list-items');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-vehicle-container">
      <h2 className="emboss display-3 text-center animate__animated animate__bounceInRight">Add Vehicle</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Production Year"
          value={productionYear}
          onChange={(e) => setProductionYear(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />
        <textarea
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <FileUpload setPhotoURL={setPhotoURL} /> {/* Add FileUpload component */}
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddItem;