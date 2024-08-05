import React, { useState } from 'react';
import CosmicNotification from './CosmicNotification'; // Import your CosmicNotification component
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [notification, setNotification] = useState(null); // For CosmicNotification

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://cosmicvaultbackendbismillah.onrender.com/api/auth/sendemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ type: 'success', message: 'Email sent successfully!' });
        setFormData({ name: '', email: '', description: '' });
      } else {
        setNotification({ type: 'error', message: data.error || 'Failed to send email.' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'An error occurred while sending the email. Please try again later.' });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div className="contact-container">
        <h2 className="section-title">Contact the Cosmic Crew</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Have questions about your cosmic journey? Reach out to us and we'll get back to you faster than light speed!</p>
            <ul>
              <li>📡 cosmic.vault@galaxy.com</li>
              <li>🌠 1-800-COSMOS</li>
              <li>🚀 123 Nebula Street, Milky Way</li>
            </ul>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Message</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
              ></textarea>
            </div>
            <button type="submit" className="cosmic-btn">
              <span>Send Transmission</span>
              <div className="cosmic-btn-bg"></div>
            </button>
          </form>
        </div>
      </div>

      {/* CosmicNotification Component */}
      {notification && (
        <CosmicNotification
          message={notification.message}
          type={notification.type}
          duration={5000}
          onClose={() => setNotification(null)}
        />
      )}
    </section>
  );
};

export default ContactSection;
