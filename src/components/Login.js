import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CosmicNotification from './CosmicNotification';
import AuthContext from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading status
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    localStorage.setItem('email', email);
    try {
      const response = await fetch(`https://cosmicvaultbackendbismillah.onrender.com/api/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        logIn(data.authToken, data.id);
        setEmail("");
        setPassword("");
        setNotification({ message: 'Welcome back! You have successfully logged in.', type: 'success' });
        setTimeout(() => {
          navigate('/');
        }, 3500);
      } else {
        setNotification({ message: data.error || 'Failed to log in. Please try again with right credentials.', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification({ message: 'An unexpected error occurred. Please try again later.', type: 'error' });
    } finally {
      setLoading(false); // Set loading to false after the login process completes
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#070714' }}>
      <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg p-8 w-full max-w-md z-10 border border-white border-opacity-10">
        <h2 className="text-4xl font-bold text-center mb-8 font-orbitron bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Access Your Cosmic Vault
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="text-right">
            <Link to="/forgotpassword" className="text-sm text-purple-400 hover:text-pink-400 transition duration-300 ease-in-out">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Logging in...' : 'Enter the Vault'} {/* Button text */}
          </button>
        </form>
        <p className="mt-6 text-center text-lavender">
          New to Cosmic Vault? 
          <Link to="/signup" className="ml-1 text-purple-400 hover:text-pink-400 transition duration-300 ease-in-out">
            Create an account
          </Link>
        </p>
      </div>
      {notification && (
        <CosmicNotification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Login;
