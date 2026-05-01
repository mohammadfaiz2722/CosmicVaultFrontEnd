import React, { useState, useEffect, useContext } from 'react';
import CosmicNotification from './CosmicNotification';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    localStorage.setItem('email', email);
    try {
      const response = await fetch(`https://cosmicvaultbackendbismillah.onrender.com/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setName('');
        setEmail('');
        setPassword('');
        setNotification({ message: 'Welcome aboard! Your Cosmic Vault account has been created.', type: 'success' });
        logIn(data.authToken, data.id); // Update AuthContext state
        setTimeout(() => {
          navigate('/');
        }, 4000);
      } else {
        setNotification({ message: data.error || 'Failed to create account. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setNotification({ message: 'An unexpected error occurred. Please try again later.', type: 'error' });
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070714]">
      <div className="bg-white bg-opacity-5 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8 font-orbitron bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Join the Cosmic Vault
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lavender mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-md text-lavender focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lavender mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-md text-lavender focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lavender mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-md text-lavender focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-lavender focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-[#070714] transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Signing Up...' : 'Create Your Vault'} {/* Change button text based on loading state */}
          </button>
        </form>
        <p className="mt-6 text-center text-lavender">
          Already have an account?
          <a href="/login" className="ml-1 text-purple-400 hover:text-pink-400 transition duration-300 ease-in-out">
            Log in
          </a>
        </p>
      </div>
      {notification && (
        <CosmicNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default SignUp;
