import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/metrics');
      } else {
        setError('Ongeldige inloggegevens. Controleer je email en wachtwoord.');
      }
    } catch (err) {
      setError('Er ging iets fout tijdens het inloggen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <AnimatedBackground cubeCount={25} />
      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="login-subtitle">Log in om toegang te krijgen tot de metrics</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@yourdomain.com"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Wachtwoord</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Inloggen...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
