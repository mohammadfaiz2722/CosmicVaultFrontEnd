import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="void-container">
      <div 
        className="void-circle" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      ></div>
      <div className="content">
        <h1 className="void-text">404</h1>
        <p className="void-message">Existence Not Found</p>
        <Link to="/" className="void-link">
          <span>Return to Reality</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;