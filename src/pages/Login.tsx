import React, { useState } from 'react';
import styled from 'styled-components';
import { login, setAuthToken } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
`;

interface LoginProps {
  onLoginSuccess: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
      onLoginSuccess();
      navigate('/dashboard');
    } catch (err: any) {
      // setError(err.message || 'Invalid email or password');
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </LoginForm>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </LoginContainer>
  );
}

export default Login;