import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';

const App = () => {
  useEffect(() => {
    console.log("Portfolio App Initialized");
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Sending...' });
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', number: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send. Please try again.' });
    }
  };

  return (
    <div className="app">
      <div className="aurora-bg"></div>
      
      <nav>
        <div className="container">
          <div className="logo">ANKUSH SINGH</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="home">
          <div className="container">
            <div className="hero-content">
              <h6 style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: 'bold' }}>HI, I'M</h6>
              <h1>Ankush Singh</h1>
              <h2 style={{ fontSize: '2.5rem', opacity: 0.8, marginBottom: '2rem' }}>ML ENGINEER</h2>
              <p>Specializing in Deep Learning, Computer Vision, and Agentic AI.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <a href="#contact" className="btn btn-primary">Let's Connect</a>
                <a href="#projects" className="btn btn-outline">View Projects</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="glass-card">
               <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  I'm a passionate Machine Learning Engineer specializing in Deep Learning, Computer Vision, and Natural Language Processing.
               </p>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="4"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
                {status.message && <p style={{ marginTop: '1rem' }}>{status.message}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>© 2026 Ankush Singh</p>
      </footer>
    </div>
  );
};

export default App;
