import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Brain, 
  Cpu, 
  Languages, 
  Terminal, 
  Database, 
  Eye, 
  Bot, 
  Server, 
  Github, 
  Linkedin, 
  Instagram,
  Send,
  Mail,
  Phone,
  User
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from './config';

const App = () => {
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
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
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
        {/* Hero Section */}
        <section id="home">
          <div className="container">
            <motion.div className="hero-content" {...fadeIn}>
              <h6 style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: 'bold' }}>HI, I'M</h6>
              <h1>Ankush Singh</h1>
              <h2 style={{ fontSize: '2.5rem', opacity: 0.8, marginBottom: '2rem' }}>ML ENGINEER</h2>
              <p>Specializing in Deep Learning, Computer Vision, and Agentic AI. Building the future of intelligent systems.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#contact" className="btn btn-primary">Let's Connect</a>
                <a href="#projects" className="btn btn-outline">View Projects</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <motion.div className="glass-card" {...fadeIn}>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  I'm a passionate Machine Learning Engineer specializing in Deep Learning, Computer Vision, and Natural Language Processing. 
                  With expertise in cutting-edge technologies like TensorFlow, PyTorch, and advanced MLOps practices, I transform complex data into intelligent, scalable AI solutions.
                </p>
                <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  My journey in AI spans across building production-grade systems for sales forecasting, image classification, and Agentic AI with RAGs.
                </p>
              </motion.div>
              <motion.div 
                className="hero-image" 
                style={{ position: 'relative' }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '1', 
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', 
                  background: 'var(--gradient-main)',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  zIndex: '-1',
                  filter: 'blur(20px)',
                  opacity: 0.5
                }}></div>
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '1', 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  border: '1px solid var(--border-glass)'
                }}>
                  <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={100} color="var(--primary)" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <div className="container">
            <h2 className="section-title">Expertise</h2>
            <div className="skills-grid">
              {[
                { name: 'Core Python', icon: <Terminal />, percent: '90%' },
                { name: 'Deep Learning', icon: <Brain />, percent: '90%' },
                { name: 'Tensorflow', icon: <Cpu />, percent: '85%' },
                { name: 'NLP', icon: <Languages />, percent: '95%' },
                { name: 'MLOPS', icon: <Server />, percent: '85%' },
                { name: 'Computer Vision', icon: <Eye />, percent: '90%' },
                { name: 'Agentic AI', icon: <Bot />, percent: '85%' },
                { name: 'Django', icon: <Code />, percent: '80%' },
                { name: 'Git', icon: <Github />, percent: '90%' },
                { name: 'SQL', icon: <Database />, percent: '90%' },
              ].map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="glass-card skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <h3 style={{ fontSize: '1rem' }}>{skill.name}</h3>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{skill.percent}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              {[
                {
                  title: 'SalesVortex',
                  desc: 'Machine learning for FMCG sales prediction using advanced forecasting.',
                  link: 'https://github.com/ankushsingh003/SalesVortex---Predicting-the-future-of-FMCG-chaos---ML_XGBOOST_RANDFOREST'
                },
                {
                  title: 'TrafficSight YOLO',
                  desc: 'Real-time road vehicle detection using YOLOv8 architecture.',
                  link: 'https://github.com/ankushsingh003/Road-Vehicle-Detection-YOLOv8-or-TrafficSight-YOLO_'
                },
                {
                  title: 'ProHire AI',
                  desc: 'GenAI-powered platform for realistic technical interview simulation.',
                  link: 'https://github.com/ankushsingh003/ProHire-AI-AUTOGEN_BASED_Interview_career_assistant_GENAI_agent-'
                },
                {
                  title: 'Glitch in the matrix',
                  desc: 'Binary image classifier distinguishing real-world vs computer-generated.',
                  link: 'https://github.com/ankushsingh003/glitch-in-the-matrix-ResNet_ImageNet_Based-ImageClassification'
                }
              ].map((project, index) => (
                <motion.div 
                  key={index} 
                  className="glass-card"
                  {...fadeIn}
                >
                  <div className="project-image">
                    <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Code size={48} color="var(--primary)" opacity={0.3} />
                    </div>
                  </div>
                  <h3>{project.title}</h3>
                  <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>{project.desc}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
                    View Code
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <motion.div className="glass-card" {...fadeIn} style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                <div className="contact-info">
                  <h3 style={{ marginBottom: '2rem' }}>Contact Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <Mail color="var(--primary)" />
                      <span>contact@ankushsingh.com</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <Phone color="var(--primary)" />
                      <span>+91 XXXXX XXXXX</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                      <Github size={24} style={{ cursor: 'pointer', opacity: 0.8 }} />
                      <Linkedin size={24} style={{ cursor: 'pointer', opacity: 0.8 }} />
                      <Instagram size={24} style={{ cursor: 'pointer', opacity: 0.8 }} />
                    </div>
                  </div>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="number" value={formData.number} onChange={handleChange} required placeholder="Your Number" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="How can I help you?" rows="4"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Send size={18} /> Send Message
                  </button>
                  {status.message && (
                    <p style={{ 
                      marginTop: '1rem', 
                      textAlign: 'center', 
                      color: status.type === 'success' ? '#55efc4' : status.type === 'error' ? '#ff7675' : 'white' 
                    }}>
                      {status.message}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)', textAlign: 'center' }}>
        <div className="container">
          <p>© 2026 Ankush Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
