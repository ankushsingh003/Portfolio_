import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import './styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'info', message: 'Sending message...' });

    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-container" id="contact">
      <h2 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '4rem', letterSpacing: '0.2em' }}>
        GET IN TOUCH
      </h2>
      
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="What's your name?"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Where can I reply to?"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="4"
              placeholder="Tell me about your project."
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status.message && (
            <p style={{ 
              marginTop: '2rem', 
              color: status.type === 'success' ? '#4ade80' : status.type === 'error' ? '#f87171' : '#fff',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
