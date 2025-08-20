'use client';

import { useState } from 'react';
import { login } from '../lib/auth';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import './login.css';

export default function LoginPage() {
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    setError('');
    const result = await login(formData);

    if (result && result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="login-page-wrapper">
      <Navbar />
      <div className="login-content-wrapper">
        <div className="login-container">
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to access your dashboard.</p>
          <form action={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}