import React, {  useEffect, useState } from 'react';
import './UploadSection.css';
import { useNavigate } from 'react-router-dom';
import CosmicNotification from './CosmicNotification';


const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/");
    }
  }, [navigate]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    setFileName(file.name);
  };

  const resetForm = () => {
    setFile(null);
    setFileName('');
    setDragActive(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setNotification({ message: 'No file selected', type: 'warning' });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('userId', localStorage.getItem('id'));

    try {
      const response = await fetch(`http://localhost:5000/api/photos/upload`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        setNotification({ message: 'Photo uploaded successfully', type: 'success' });
        resetForm();
      } else {
        setNotification({ message: `Upload failed: ${result.error}`, type: 'error' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setNotification({ message: 'An error occurred during upload', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="cosmic-background"></div>
      
      <div className="upload-container">
        <h1 className="upload-title">Cosmic Memory Vault</h1>
        
        <div className="upload-content">
          <div className="upload-info">
            <h2>Preserve Your Stellar Moments</h2>
            <p>Upload your cherished photos to your personal Cosmic Vault. Each image is a star in your galaxy of memories.</p>
            <ul className="feature-list">
              <li><span className="icon">🚀</span> Warp-speed uploads</li>
              <li><span className="icon">🌌</span> Infinite storage</li>
              <li><span className="icon">🛸</span> Quantum encryption</li>
              <li><span className="icon">🌈</span> Nebula enhancement</li>
            </ul>
          </div>
          
          <form className="upload-form" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="file" 
              id="file-upload" 
              onChange={handleChange} 
              accept="image/*" 
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="file-upload" 
              className={`upload-label ${dragActive ? "drag-active" : ""} ${file ? "file-selected" : ""}`}
            >
              <div className="upload-icon"></div>
              <p>{file ? `Selected: ${fileName}` : "Beam up your cosmic image"}</p>
              <button 
                type="button"
                className="upload-button"
                onClick={() => document.getElementById('file-upload').click()}
              >
                Choose a file
              </button>
            </label>
            
            {dragActive && 
              <div 
                className="drag-file-element" 
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              ></div>
            }
          </form>

          {file && (
            <div className="file-info">
              <button 
                className={`cosmic-btn ${uploading ? 'uploading' : ''}`} 
                onClick={handleUpload}
                disabled={uploading}
              >
                <span>{uploading ? 'Launching...' : 'Launch to Your Vault'}</span>
                <div className="cosmic-btn-bg"></div>
              </button>
            </div>
          )}
        </div>
        
        <div className="floating-elements">
          <div className="planet"></div>
          <div className="astronaut"></div>
          <div className="satellite"></div>
          <div className="shooting-star"></div>
        </div>
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

export default UploadPage;
