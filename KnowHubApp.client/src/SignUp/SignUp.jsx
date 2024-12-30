import React, { useState } from 'react';
import './SignUp.css';
import FullName from '../assets/Account/fullname.png';
import Mail from '../assets/Account/mail.png';
import UserName from '../assets/Account/username.png';
import Password from '../assets/Account/password.png';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!fullName || !email || !username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/accounts/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, username, password }),
      });

      if (response.ok) {
        alert('Sign up successful!');
      } else {
        alert('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="container-signup">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
        <div className="input">
            <img src={FullName} alt="" />
            <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            />
        </div>
        <div className="input">
            <img src={Mail} alt="" />
            <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="input">
            <img src={UserName} alt="" />
            <input
            type="text"
            name="username"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="input">
            <img src={Password} alt="" />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSignUp}>
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
