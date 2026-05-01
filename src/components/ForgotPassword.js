import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CosmicNotification from './CosmicNotification'; // Assuming you have a notification component

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(null);
const navigate=useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`https://cosmicvaultbackendbismillah.onrender.com/api/auth/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem('email',data.email);
        localStorage.setItem('otpToken',data.otpToken)
        setNotification({ message: 'OTP has been sent to your email.', type: 'success' });
        setEmail("");
        setTimeout(() => {
          navigate("/verifyotp")
        }, 4000);
      } else {
        setNotification({ message: data.error || 'Failed to send OTP. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setNotification({ message: 'An unexpected error occurred. Please try again later.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#070714' }}>
      <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg p-8 w-full max-w-md z-10 border border-white border-opacity-10">
        <h2 className="text-4xl font-bold text-center mb-8 font-orbitron bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Reset Your Password
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
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Send Reset OTP
          </button>
        </form>
        <p className="mt-6 text-center text-lavender">
          Remember your password?
          <Link to="/login" className="ml-1 text-purple-400 hover:text-pink-400 transition duration-300 ease-in-out">
            Log in
          </Link>
        </p>
      </div>
      {notification && (
        <CosmicNotification
          message={notification.message}
          type={notification.type}
          duration={5000}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
