import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyOtp.css';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      try {
        const email=localStorage.getItem('email')
        const otpToken=localStorage.getItem('otpToken')
        const response = await fetch(`https://cosmicvaultbackendbismillah.onrender.com/api/auth/verifyotp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({otp: otpString,email,otpToken }),
        });

        if (response.ok) {
          setNotification({ message: 'OTP verified successfully!', type: 'success' });
          setTimeout(() => {
            navigate('/resetpassword');
          }, 2000);
        } else {
          setNotification({ message: 'Invalid OTP. Please try again.', type: 'error' });
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        setNotification({ message: 'An unexpected error occurred. Please try again later.', type: 'error' });
      }
    } else {
      setNotification({ message: 'Please enter a valid 6-digit OTP.', type: 'error' });
    }
  };

  const handleResendOTP = () => {
    // Call your API to resend OTP here
    console.log('Resending OTP');
    setNotification({ message: 'OTP has been resent to your email.', type: 'info' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070714]">
      <div className="bg-white bg-opacity-5 rounded-lg p-8 w-full max-w-md relative overflow-hidden">
        <div className="cosmic-background"></div>
        <div className="cosmic-glow"></div>
        <h2 className="text-4xl font-bold text-center mb-8 font-orbitron bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text relative z-10">
          Verify Cosmic Code
        </h2>
        <p className="text-lavender text-center mb-6 relative z-10">
          Enter the 6-digit code sent to your email
        </p>
        {notification.message && (
          <div className={`notification ${notification.type} mb-4 text-center relative z-10`}>
            {notification.message}
          </div>
        )}
        <form onSubmit={handleVerify} className="space-y-6 relative z-10">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center bg-white bg-opacity-5 border border-white border-opacity-20 rounded-md text-lavender focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-[#070714] transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Verify OTP
          </button>
        </form>
        <p className="mt-6 text-center text-lavender relative z-10">
          Didn't receive the code?{' '}
          <button 
            onClick={handleResendOTP}
            className="text-purple-400 hover:text-pink-400 transition duration-300 ease-in-out"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
