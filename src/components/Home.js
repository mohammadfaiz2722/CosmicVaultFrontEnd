import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
const navigate=useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
const enterVault=()=>{
  if(localStorage.getItem('token'))
  {
navigate("/uploadsection")
  }
  else{
navigate("/login")
  }
}
  return (
    <div className="cosmic-container">
      <div className="stars" style={{transform: `translateY(${scrollPosition * 0.5}px)`}}></div>
      <div className="twinkling" style={{transform: `translateY(${scrollPosition * 0.2}px)`}}></div>

      <section className="hero-section">
        <div className="cosmic-title">
          <h1>Cosmic Vault</h1>
          <p>Your Personal Space for Stellar Memories</p>
        </div>
        <span  className="cosmic-btn cursor-pointer" onClick={enterVault} style={{width:'fit-content'}}>
          <span >Enter Your Vault</span>
          <div className="cosmic-btn-bg"></div>
        </span>
      </section>

      <section id="about" className="about-section">
        <h2 className="section-title">About Cosmic Vault</h2>
        <div className="about-content">
          <p>Cosmic Vault is your personal, secure space to store and organize your most precious memories. With a user-friendly interface and robust security measures, we ensure your photos are safe and easily accessible.</p>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2 className="section-title">Stellar Features</h2>
        <div className="features-container">
          {[
            { icon: '🔐', title: 'Private Storage', description: 'Your photos are securely stored and accessible only to you.' },
            { icon: '🚀', title: 'Fast Uploads', description: 'Upload your photos at light speed with our optimized system.' },
            { icon: '📱', title: 'Access Anywhere', description: 'View and download your photos from any device, anytime.' },
            { icon: '🗂️', title: 'Easy Organization', description: 'Sort and categorize your photos with our intuitive tools.' }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          {[
            { number: '1', title: 'Sign Up', description: 'Create your account in just a few clicks.' },
            { number: '2', title: 'Upload', description: 'Easily upload your photos to your personal vault.' },
            { number: '3', title: 'Organize', description: 'Sort your photos into albums or use tags for easy retrieval.' },
            { number: '4', title: 'Access', description: 'View, download, or share your photos anytime, anywhere.' }
          ].map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-container">
          {[
            { name: 'Alex S.', quote: 'Cosmic Vault has been a game-changer for storing my travel photos securely.' },
            { name: 'Jamie L.', quote: 'I love how easy it is to organize and access my photos from any device.' },
            { name: 'Sam T.', quote: 'The peace of mind knowing my memories are safe is priceless.' }
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p>"{testimonial.quote}"</p>
              <h4>- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="cta-section">
        <h2>Ready to Secure Your Memories?</h2>
        <p>Join Cosmic Vault today and give your photos the home they deserve.</p>
        <span onClick={enterVault}  className="cta-btn cursor-pointer">
          <span >Start Your Journey</span>
          <div className="cta-btn-stars"></div>
        </span>
      </section>
    </div>
  );
}

export default Home;