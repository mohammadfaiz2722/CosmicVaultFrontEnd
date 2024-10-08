import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';
import CosmicNotification from './CosmicNotification';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const [notification, setNotification] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogOut = () => {
    logOut();
    setNotification({ type: 'success', message: 'Logged out successfully' });
    navigate('/');
    closeMenu();
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/gallerysection', label: 'Gallery', requireAuth: true },
    { to: '/uploadsection', label: 'Upload', requireAuth: true },
    { to: '/contactsection', label: 'Contact' },
  ];

  const CosmicButton = ({ children, onClick, className }) => (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden px-6 py-2 rounded-lg
        text-cyan-300 font-medium transition-all duration-300
        bg-[#1a1a2e] border border-cyan-700
        hover:bg-[#252540] hover:text-cyan-200 hover:border-cyan-500
        focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-opacity-50
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-cyan-700 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
    </button>
  );

  return (
    <nav className={`top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#050510]`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif', color: '#8A2BE2' }}>
            CosmicVault
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              (!link.requireAuth || isLoggedIn) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-white hover:text-cyan-400 transition duration-300 ${location.pathname === link.to ? 'border-b-2 border-cyan-400' : ''}`}
                >
                  {link.label}
                </Link>
              )
            ))}
            {isLoggedIn && (
              <Link
                to="/profilesection"
                className={`text-white hover:text-cyan-400 transition duration-300 ${location.pathname === '/profilesection' ? 'border-b-2 border-cyan-400' : ''}`}
              >
                Profile
              </Link>
            )}
            {isLoggedIn ? (
              <CosmicButton onClick={handleLogOut}>Log Out</CosmicButton>
            ) : (
              <CosmicButton onClick={() => navigate('/login')}>Login</CosmicButton>
            )}
          </div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              (!link.requireAuth || isLoggedIn) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-white hover:text-cyan-400 transition duration-300 ${location.pathname === link.to ? 'border-b-2 border-cyan-400' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )
            ))}
            {isLoggedIn && (
              <Link
                to="/profilesection"
                className={`text-white hover:text-cyan-400 transition duration-300 ${location.pathname === '/profilesection' ? 'border-b-2 border-cyan-400' : ''}`}
                onClick={closeMenu}
              >
                Profile
              </Link>
            )}
            {isLoggedIn ? (
              <CosmicButton onClick={handleLogOut} className="w-full">Log Out</CosmicButton>
            ) : (
              <CosmicButton onClick={() => { navigate('/login'); closeMenu(); }} className="w-full">Login</CosmicButton>
            )}
          </div>
        </div>
      </div>

      {notification && (
        <CosmicNotification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;
