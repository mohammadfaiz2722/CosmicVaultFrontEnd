import React, { useState, useEffect } from 'react';
import './CosmicNotification.css';

const CosmicNotification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevProgress - (100 / (duration / 100));
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '🚀';
      case 'error':
        return '☄️';
      case 'warning':
        return '🌠';
      default:
        return '🌟';
    }
  };

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div className={`cosmic-notification ${type} ${visible ? 'visible' : ''}`}>
      <div className="cosmic-notification-content">
        <span className="cosmic-notification-icon">{getIcon()}</span>
        <p className="cosmic-notification-message">{message}</p>
        <button className="cosmic-notification-close" onClick={handleClose}>×</button>
      </div>
      <div className="cosmic-notification-progress" style={{ width: `${progress}%` }}></div>
      <div className="cosmic-notification-stardust"></div>
    </div>
  );
};

export default CosmicNotification;