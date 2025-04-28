import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@/utils/auth';

interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (type === 'login') {
      if (email === 'test@example.com' && password === 'password') {
        setToken('dummy-token');
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } else if (type === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      navigate('/login');
    } else if (type === 'forgot-password') {
      setMessage('A reset link has been sent to your email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          {type === 'login' ? 'Login' : type === 'register' ? 'Register' : 'Forgot Password'}
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {type !== 'forgot-password' && (
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {type === 'register' && (
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

        <button
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {type === 'login' ? 'Login' : type === 'register' ? 'Register' : 'Send Reset Link'}
        </button>

        {type === 'login' && (
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
            <p className="mt-2 text-gray-600">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
          </div>
        )}

        {type === 'register' && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
          </div>
        )}

        {type === 'forgot-password' && (
          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-600 hover:underline">Back to Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
