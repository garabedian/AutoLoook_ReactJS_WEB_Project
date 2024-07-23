import React, { useContext, useState } from 'react';
import Backendless from '../backendless';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user-context.jsx';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Backendless.UserService.login(email, password, true);
      const currentUser = await Backendless.UserService.getCurrentUser();
      setUser(currentUser);
      navigate('/AutoLoook_ReactJS_WEB_Project');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;