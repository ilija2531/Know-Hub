import React, { useState } from 'react';
import './Login.css';
import userName from '../assets/Account/username.png';
import password from '../assets/Account/password.png';

const Login = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!Username || !Password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch("http://localhost:5188/api/accounts/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username, Password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');
        console.log(data); // Handle login response (e.g., token storage)
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="container-login">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={userName} alt="" />
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="forgot-password">
          Forgot Password? <span>Click Here!</span>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleLogin}>
            Login
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
