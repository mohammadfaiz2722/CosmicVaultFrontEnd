import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CosmicNotification from './CosmicNotification';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const email = localStorage.getItem('email');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/resetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      setNotification({ message: 'Password reset successful! Redirecting to login...', type: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } else {
      setNotification({ message: data.message || 'Error resetting password. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070714]">
      <div className="bg-white bg-opacity-5 rounded-lg p-8 w-full max-w-md relative overflow-hidden">
        <div className="cosmic-background"></div>
        <div className="cosmic-glow"></div>
        <h2 className="text-4xl font-bold text-center mb-8 font-orbitron bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text relative z-10">
          Set New Cosmic Key
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-6 relative z-10">
          <div className="relative">
            <label htmlFor="newPassword" className="block text-lavender mb-2">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-md text-lavender focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-lavender focus:outline-none mt-1"
            >
              {showNewPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-lavender mb-2">Confirm New Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-md text-lavender focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-lavender focus:outline-none mt-1"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-[#070714] transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-6 text-center text-lavender relative z-10">
          Remember your password?{' '}
          <a href="/login" className="text-purple-400 hover:text-pink-400 transition duration-300 ease-in-out">
            Log in
          </a>
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

export default ResetPassword;
