import React, { useState } from 'react';
import Backendless from '../backendless';
import { useNavigate } from 'react-router-dom';
import { updateUserToken } from '../utils/token-utils.js';

const Relogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRelogin = async (e) => {
    e.preventDefault();
    try {
      await updateUserToken(email, password);
      navigate('/AutoLoook_ReactJS_WEB_Project');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relogin-container">
      <h2 className="emboss display-3
           text-center animate__animated animate__bounceInRight">Re-login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRelogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Re-login</button>
      </form>
    </div>
  );
};

export default Relogin;